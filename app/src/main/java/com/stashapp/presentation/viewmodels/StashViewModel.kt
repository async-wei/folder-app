package com.stashapp.presentation.viewmodels

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.stashapp.data.database.SavedItemEntity
import com.stashapp.data.database.StashEntity
import com.stashapp.data.repository.StashRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class StashViewModel(
    private val repository: StashRepository
) : ViewModel() {

    val stashes: StateFlow<List<StashEntity>> = repository.getAllStashes()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _selectedStashId = MutableStateFlow<Int?>(null)
    val selectedStashId: StateFlow<Int?> = _selectedStashId.asStateFlow()

    val selectedStash: StateFlow<StashEntity?> = repository.getStashById(
        selectedStashId.value ?: -1
    ).stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    val selectedStashItems: StateFlow<List<SavedItemEntity>> =
        repository.getItemsByStash(selectedStashId.value ?: -1)
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    val searchResults: StateFlow<List<SavedItemEntity>> =
        repository.globalSearch(_searchQuery.value)
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val favoriteItems: StateFlow<List<SavedItemEntity>> = repository.getFavoriteItems()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _showSaveDialog = MutableStateFlow(false)
    val showSaveDialog: StateFlow<Boolean> = _showSaveDialog.asStateFlow()

    private val _pendingItemData = MutableStateFlow<PendingItemData?>(null)
    val pendingItemData: StateFlow<PendingItemData?> = _pendingItemData.asStateFlow()

    val itemCounts: StateFlow<Map<Int, Int>> = combine(
        stashes,
        repository.getAllItems()
    ) { stashes, allItems ->
        stashes.associate { stash ->
            stash.id to allItems.count { it.stashId == stash.id }
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyMap())

    fun selectStash(stashId: Int) {
        _selectedStashId.value = stashId
    }

    fun updateSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun createStash(name: String, description: String = "", color: String = "#FF6B6B") {
        viewModelScope.launch {
            repository.createStash(name, description, color)
        }
    }

    fun updateStash(id: Int, name: String, description: String, color: String) {
        viewModelScope.launch {
            repository.updateStash(id, name, description, color)
        }
    }

    fun deleteStash(id: Int) {
        viewModelScope.launch {
            repository.deleteStash(id)
        }
    }

    fun saveItem(
        stashId: Int,
        title: String,
        url: String,
        description: String = "",
        imageUrl: String = "",
        tags: List<String> = emptyList(),
        sourceApp: String = ""
    ) {
        viewModelScope.launch {
            repository.saveItem(
                stashId = stashId,
                title = title,
                url = url,
                description = description,
                imageUrl = imageUrl,
                tags = tags,
                sourceApp = sourceApp
            )
            _showSaveDialog.value = false
            _pendingItemData.value = null
        }
    }

    fun updateItem(
        itemId: Int,
        title: String,
        description: String,
        tags: List<String>
    ) {
        viewModelScope.launch {
            repository.updateItem(itemId, title, description, tags)
        }
    }

    fun deleteItem(itemId: Int) {
        viewModelScope.launch {
            repository.deleteItem(itemId)
        }
    }

    fun toggleFavorite(itemId: Int, isFavorite: Boolean) {
        viewModelScope.launch {
            repository.toggleFavorite(itemId, isFavorite)
        }
    }

    fun handleSharedText(text: String, title: String?) {
        _pendingItemData.value = PendingItemData(
            title = title ?: "",
            url = text,
            sourceApp = "shared"
        )
        _showSaveDialog.value = true
    }

    fun handleSharedMedia(uri: Uri) {
        _pendingItemData.value = PendingItemData(
            imageUrl = uri.toString(),
            sourceApp = "shared"
        )
        _showSaveDialog.value = true
    }

    fun hideSaveDialog() {
        _showSaveDialog.value = false
        _pendingItemData.value = null
    }

    data class PendingItemData(
        val title: String = "",
        val url: String = "",
        val imageUrl: String = "",
        val description: String = "",
        val sourceApp: String = ""
    )
}
