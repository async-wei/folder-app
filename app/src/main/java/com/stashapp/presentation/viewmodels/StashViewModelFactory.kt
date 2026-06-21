package com.stashapp.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.stashapp.data.repository.StashRepository

class StashViewModelFactory(
    private val repository: StashRepository
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(StashViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return StashViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
