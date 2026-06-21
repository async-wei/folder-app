package com.stashapp.data.database

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface StashDao {
    @Insert
    suspend fun insertStash(stash: StashEntity): Long

    @Update
    suspend fun updateStash(stash: StashEntity)

    @Delete
    suspend fun deleteStash(stash: StashEntity)

    @Query("SELECT * FROM stashes ORDER BY updatedAt DESC")
    fun getAllStashes(): Flow<List<StashEntity>>

    @Query("SELECT * FROM stashes WHERE id = :id")
    suspend fun getStashById(id: Int): StashEntity?

    @Query("SELECT * FROM stashes WHERE id = :id")
    fun getStashByIdFlow(id: Int): Flow<StashEntity?>

    @Query("SELECT * FROM stashes WHERE name LIKE '%' || :query || '%'")
    fun searchStashes(query: String): Flow<List<StashEntity>>
}

@Dao
interface SavedItemDao {
    @Insert
    suspend fun insertItem(item: SavedItemEntity): Long

    @Update
    suspend fun updateItem(item: SavedItemEntity)

    @Delete
    suspend fun deleteItem(item: SavedItemEntity)

    @Query("SELECT * FROM saved_items ORDER BY savedAt DESC")
    fun getAllItems(): Flow<List<SavedItemEntity>>

    @Query("SELECT * FROM saved_items WHERE stashId = :stashId ORDER BY savedAt DESC")
    fun getItemsByStash(stashId: Int): Flow<List<SavedItemEntity>>

    @Query("SELECT * FROM saved_items WHERE id = :id")
    suspend fun getItemById(id: Int): SavedItemEntity?

    @Query("""
        SELECT * FROM saved_items
        WHERE stashId = :stashId AND (
            title LIKE '%' || :query || '%' OR
            description LIKE '%' || :query || '%' OR
            tags LIKE '%' || :query || '%'
        )
        ORDER BY savedAt DESC
    """)
    fun searchItems(stashId: Int, query: String): Flow<List<SavedItemEntity>>

    @Query("""
        SELECT * FROM saved_items
        WHERE title LIKE '%' || :query || '%' OR
            description LIKE '%' || :query || '%' OR
            tags LIKE '%' || :query || '%' OR
            url LIKE '%' || :query || '%'
        ORDER BY savedAt DESC
    """)
    fun globalSearch(query: String): Flow<List<SavedItemEntity>>

    @Query("SELECT * FROM saved_items WHERE isFavorite = 1 ORDER BY savedAt DESC")
    fun getFavoriteItems(): Flow<List<SavedItemEntity>>

    @Query("UPDATE saved_items SET isFavorite = :isFavorite WHERE id = :id")
    suspend fun updateFavorite(id: Int, isFavorite: Boolean)

    @Query("SELECT COUNT(*) FROM saved_items WHERE stashId = :stashId")
    fun getItemCount(stashId: Int): Flow<Int>
}
