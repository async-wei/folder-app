package com.stashapp.data.database

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity(tableName = "stashes")
data class StashEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val name: String,
    val description: String = "",
    val color: String = "#FF6B6B",
    val icon: String = "",
    val itemCount: Int = 0,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis(),
    val isShared: Boolean = false,
    val collaborators: String = "" // JSON string of collaborator emails
)

@Entity(tableName = "saved_items")
data class SavedItemEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val stashId: Int,
    val title: String = "",
    val description: String = "",
    val url: String = "",
    val imageUrl: String = "",
    val tags: String = "", // CSV string
    val sourceApp: String = "", // e.g., "instagram", "tiktok", "safari"
    val savedAt: Long = System.currentTimeMillis(),
    val isFavorite: Boolean = false,
    val isLocalOnly: Boolean = false,
    val raw: String = "" // Raw metadata as JSON
)

@Entity(tableName = "saved_items_full")
data class SavedItemFull(
    val item: SavedItemEntity,
    val stashId: Int,
    val stashName: String
)
