package com.stashapp.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [StashEntity::class, SavedItemEntity::class],
    version = 1,
    exportSchema = true
)
abstract class StashDatabase : RoomDatabase() {
    abstract fun stashDao(): StashDao
    abstract fun savedItemDao(): SavedItemDao

    companion object {
        @Volatile
        private var instance: StashDatabase? = null

        fun getInstance(context: Context): StashDatabase =
            instance ?: synchronized(this) {
                instance ?: Room.databaseBuilder(
                    context.applicationContext,
                    StashDatabase::class.java,
                    "stash_database"
                ).build().also { instance = it }
            }
    }
}
