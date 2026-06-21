package com.stashapp

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.stashapp.data.database.StashDatabase
import com.stashapp.data.repository.StashRepository
import com.stashapp.presentation.components.StashBottomNavigationBar
import com.stashapp.presentation.screens.HomeScreenV2
import com.stashapp.presentation.screens.SearchScreen
import com.stashapp.presentation.screens.StashDetailScreen
import com.stashapp.presentation.screens.UnstashedScreen
import com.stashapp.presentation.screens.SettingsScreen
import com.stashapp.presentation.viewmodels.StashViewModel
import com.stashapp.presentation.viewmodels.StashViewModelFactory
import com.stashapp.ui.theme.StashAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            StashAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    val database = StashDatabase.getInstance(this@MainActivity)
                    val repository = StashRepository(database.stashDao(), database.savedItemDao())
                    val factory = StashViewModelFactory(repository)
                    val viewModel: StashViewModel = viewModel(factory = factory)

                    val currentRoute = remember { mutableStateOf("home") }

                    LaunchedEffect(Unit) {
                        handleIncomingIntent(intent, viewModel)
                    }

                    Scaffold(
                        bottomBar = {
                            StashBottomNavigationBar(
                                currentRoute = currentRoute.value,
                                onNavigate = { route ->
                                    currentRoute.value = route
                                    navController.navigate(route) {
                                        popUpTo("home") { saveState = true }
                                        launchSingleTop = true
                                        restoreState = true
                                    }
                                }
                            )
                        }
                    ) { paddingValues ->
                        NavHost(
                            navController = navController,
                            startDestination = "home",
                            modifier = Modifier.padding(bottom = paddingValues.calculateBottomPadding())
                        ) {
                            composable("home") {
                                currentRoute.value = "home"
                                HomeScreenV2(
                                    viewModel = viewModel,
                                    onStashClick = { stashId ->
                                        navController.navigate("stash/$stashId")
                                    },
                                    onSearchClick = {
                                        currentRoute.value = "search"
                                        navController.navigate("search")
                                    }
                                )
                            }
                            composable("unstashed") {
                                currentRoute.value = "unstashed"
                                UnstashedScreen(
                                    viewModel = viewModel
                                )
                            }
                            composable("search") {
                                currentRoute.value = "search"
                                SearchScreen(
                                    viewModel = viewModel,
                                    onBackClick = {
                                        currentRoute.value = "home"
                                        navController.popBackStack()
                                    },
                                    onItemClick = { itemId ->
                                        // TODO: Navigate to item detail
                                    }
                                )
                            }
                            composable("settings") {
                                currentRoute.value = "settings"
                                SettingsScreen()
                            }
                            composable("stash/{stashId}") { backStackEntry ->
                                val stashId = backStackEntry.arguments?.getString("stashId")
                                if (stashId != null) {
                                    StashDetailScreen(
                                        stashId = stashId,
                                        viewModel = viewModel,
                                        onBackClick = {
                                            currentRoute.value = "home"
                                            navController.popBackStack()
                                        }
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        this.intent = intent
    }

    private fun handleIncomingIntent(intent: Intent, viewModel: StashViewModel) {
        when (intent.action) {
            Intent.ACTION_SEND -> {
                val sharedText = intent.getStringExtra(Intent.EXTRA_TEXT)
                val sharedUri = intent.getParcelableExtra<Uri>(Intent.EXTRA_STREAM)
                val sharedTitle = intent.getStringExtra(Intent.EXTRA_SUBJECT)

                sharedText?.let { viewModel.handleSharedText(it, sharedTitle) }
                sharedUri?.let { viewModel.handleSharedMedia(it) }
            }
            Intent.ACTION_SEND_MULTIPLE -> {
                val uris = intent.getParcelableArrayListExtra<Uri>(Intent.EXTRA_STREAM)
                uris?.forEach { uri ->
                    viewModel.handleSharedMedia(uri)
                }
            }
        }
    }
}
