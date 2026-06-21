package com.stashapp.data.repository

import com.stashapp.data.database.SavedItemDao
import com.stashapp.data.database.SavedItemEntity
import com.stashapp.data.database.StashDao
import com.stashapp.data.database.StashEntity
import kotlinx.coroutines.flow.Flow

class StashRepository(
    private val stashDao: StashDao,
    private val itemDao: SavedItemDao
) {
    // Stash operations
    fun getAllStashes(): Flow<List<StashEntity>> = stashDao.getAllStashes()

    fun getStashById(id: Int): Flow<StashEntity?> = stashDao.getStashByIdFlow(id)

    fun searchStashes(query: String): Flow<List<StashEntity>> = stashDao.searchStashes(query)

    suspend fun createStash(name: String, description: String = "", color: String = "#FF6B6B"): Long {
        val stash = StashEntity(
            name = name,
            description = description,
            color = color
        )
        return stashDao.insertStash(stash)
    }

    suspend fun updateStash(id: Int, name: String, description: String, color: String) {
        val stash = stashDao.getStashById(id) ?: return
        stashDao.updateStash(
            stash.copy(
                name = name,
                description = description,
                color = color,
                updatedAt = System.currentTimeMillis()
            )
        )
    }

    suspend fun deleteStash(id: Int) {
        val stash = stashDao.getStashById(id) ?: return
        stashDao.deleteStash(stash)
    }

    // Item operations
    fun getAllItems(): Flow<List<SavedItemEntity>> = itemDao.getAllItems()

    fun getItemsByStash(stashId: Int): Flow<List<SavedItemEntity>> = itemDao.getItemsByStash(stashId)

    fun searchItems(stashId: Int, query: String): Flow<List<SavedItemEntity>> =
        itemDao.searchItems(stashId, query)

    fun globalSearch(query: String): Flow<List<SavedItemEntity>> = itemDao.globalSearch(query)

    fun getFavoriteItems(): Flow<List<SavedItemEntity>> = itemDao.getFavoriteItems()

    suspend fun saveItem(
        stashId: Int,
        title: String,
        url: String,
        description: String = "",
        imageUrl: String = "",
        tags: List<String> = emptyList(),
        sourceApp: String = ""
    ): Long {
        val item = SavedItemEntity(
            stashId = stashId,
            title = title,
            url = url,
            description = description,
            imageUrl = imageUrl,
            tags = tags.joinToString(","),
            sourceApp = sourceApp
        )
        return itemDao.insertItem(item)
    }

    suspend fun updateItem(
        itemId: Int,
        title: String,
        description: String,
        tags: List<String>
    ) {
        val item = itemDao.getItemById(itemId) ?: return
        itemDao.updateItem(
            item.copy(
                title = title,
                description = description,
                tags = tags.joinToString(",")
            )
        )
    }

    suspend fun deleteItem(itemId: Int) {
        val item = itemDao.getItemById(itemId) ?: return
        itemDao.deleteItem(item)
    }

    suspend fun toggleFavorite(itemId: Int, isFavorite: Boolean) {
        itemDao.updateFavorite(itemId, isFavorite)
    }

    fun getItemCount(stashId: Int): Flow<Int> = itemDao.getItemCount(stashId)
}
