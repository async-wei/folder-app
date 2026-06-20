package com.stashapp.di

import android.content.Context
import com.stashapp.data.database.StashDatabase
import com.stashapp.data.repository.StashRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Singleton
    @Provides
    fun provideStashDatabase(@ApplicationContext context: Context): StashDatabase {
        return StashDatabase.getInstance(context)
    }

    @Singleton
    @Provides
    fun provideStashDao(database: StashDatabase) = database.stashDao()

    @Singleton
    @Provides
    fun provideSavedItemDao(database: StashDatabase) = database.savedItemDao()

    @Singleton
    @Provides
    fun provideStashRepository(
        stashDao: com.stashapp.data.database.StashDao,
        itemDao: com.stashapp.data.database.SavedItemDao
    ): StashRepository {
        return StashRepository(stashDao, itemDao)
    }
}
