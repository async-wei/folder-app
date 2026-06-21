package com.stashapp.presentation.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Button
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.text.input.ImeAction
import com.stashapp.data.database.StashEntity
import com.stashapp.presentation.viewmodels.StashViewModel

@Composable
fun HomeScreenV2(
    viewModel: StashViewModel,
    onStashClick: (Int) -> Unit,
    onSearchClick: () -> Unit
) {
    val stashes = viewModel.stashes.collectAsState().value
    val itemCounts = viewModel.itemCounts.collectAsState().value
    val showCreateDialog = remember { mutableStateOf(false) }
    val expandedFeatures = remember { mutableStateOf(setOf<Int>()) }

    if (showCreateDialog.value) {
        CreateStashDialogV2(
            onDismiss = { showCreateDialog.value = false },
            onSave = { name, color ->
                viewModel.createStash(name, "", color)
                showCreateDialog.value = false
            }
        )
    }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showCreateDialog.value = true },
                containerColor = MaterialTheme.colorScheme.primary
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Stash", tint = Color.White)
            }
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.background)
                .padding(paddingValues),
            verticalArrangement = Arrangement.spacedBy(20.dp),
            contentPadding = androidx.compose.foundation.layout.PaddingValues(
                start = 16.dp,
                end = 16.dp,
                top = 16.dp,
                bottom = 100.dp
            )
        ) {
            // Header
            item {
                Column {
                    Text(
                        text = "My Stash",
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Your home for everything worth keeping.",
                        fontSize = 14.sp,
                        color = MaterialTheme.colorScheme.outline,
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }
            }

            // Search Bar
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            MaterialTheme.colorScheme.surface,
                            shape = RoundedCornerShape(12.dp)
                        )
                        .clickable(onClick = onSearchClick)
                        .padding(12.dp),
                    contentAlignment = Alignment.CenterStart
                ) {
                    Text(
                        "🔍 Search your stashes...",
                        fontSize = 14.sp,
                        color = MaterialTheme.colorScheme.outline
                    )
                }
            }

            // What's New Section
            item {
                WhatsNewSection(
                    expandedFeatures = expandedFeatures.value,
                    onToggleFeature = { featureId ->
                        expandedFeatures.value = if (featureId in expandedFeatures.value) {
                            expandedFeatures.value - featureId
                        } else {
                            expandedFeatures.value + featureId
                        }
                    }
                )
            }

            // Stash as you go
            item {
                StashAsYouGoSection()
            }

            // Stashes Header
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Your Stashes",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "${stashes.size} stashes",
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.outline
                    )
                }
            }

            // Stashes Grid
            item {
                if (stashes.isEmpty()) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(200.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(
                                "No stashes yet",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                "Tap + to create your first stash",
                                fontSize = 12.sp,
                                color = MaterialTheme.colorScheme.outline,
                                modifier = Modifier.padding(top = 4.dp)
                            )
                        }
                    }
                } else {
                    Column(
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        for (i in stashes.indices step 2) {
                            Row(
                                horizontalArrangement = Arrangement.spacedBy(12.dp),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                for (j in i until minOf(i + 2, stashes.size)) {
                                    val stash = stashes[j]
                                    Box(modifier = Modifier.weight(1f)) {
                                        StashCardV2(
                                            stash = stash,
                                            itemCount = itemCounts[stash.id] ?: 0,
                                            onClick = { onStashClick(stash.id) }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun StashCardV2(
    stash: StashEntity,
    itemCount: Int,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(160.dp)
            .background(
                color = parseColor(stash.color),
                shape = RoundedCornerShape(16.dp)
            )
            .clickable(onClick = onClick)
            .padding(12.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = stash.name,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = "$itemCount item${if (itemCount != 1) "s" else ""}",
                fontSize = 13.sp,
                color = Color.White.copy(alpha = 0.9f)
            )
        }
    }
}

@Composable
fun WhatsNewSection(
    expandedFeatures: Set<Int>,
    onToggleFeature: (Int) -> Unit
) {
    val features = listOf(
        Triple(0, "iCloud sync, rebuilt", "Sync is faster, more reliable, and recovers itself when something goes sideways."),
        Triple(1, "Bulk-import from Photos", "Pull in up to 50 screenshots at a time and optionally delete them from Photos after they're safely stashed."),
        Triple(2, "Pinch to zoom, the right way", "Image previews now zoom from your fingers and pan smoothly, just like Photos. Double-tap snaps in and out.")
    )

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f),
                shape = RoundedCornerShape(12.dp)
            )
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = "✨ What's New",
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )

        features.forEach { (id, title, description) ->
            val isExpanded = id in expandedFeatures

            Column {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { onToggleFeature(id) }
                        .padding(8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = title,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onBackground
                        )
                    }
                    Icon(
                        Icons.Default.Close,
                        contentDescription = null,
                        modifier = Modifier.size(16.dp),
                        tint = MaterialTheme.colorScheme.outline
                    )
                }

                if (isExpanded) {
                    Text(
                        text = description,
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.7f),
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun StashAsYouGoSection() {
    val templates = listOf(
        "Outfits" to Color(0xFFFFB3B3),
        "Business ideas" to Color(0xFFFFB3B3),
        "Date nights" to Color(0xFFFFB3B3),
        "Home inspo" to Color(0xFFFFB3B3)
    )

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                Color.White,
                shape = RoundedCornerShape(12.dp)
            )
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = "💡 Stash as you go",
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = "Spotted a cool outfit? Make an Outfits stash. Found a recipe? Recipes stash. Share from apps or import existing screenshots from Photos.",
            fontSize = 11.sp,
            color = MaterialTheme.colorScheme.outline
        )
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            templates.forEach { (label, color) ->
                Box(
                    modifier = Modifier
                        .background(color.copy(alpha = 0.2f), shape = RoundedCornerShape(6.dp))
                        .padding(6.dp, 3.dp)
                ) {
                    Text(
                        label,
                        fontSize = 10.sp,
                        color = color,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}

@Composable
fun CreateStashDialogV2(
    onDismiss: () -> Unit,
    onSave: (String, String) -> Unit
) {
    val stashName = remember { mutableStateOf("") }
    val selectedColor = remember { mutableStateOf("#FF6B6B") }
    val selectedTemplate = remember { mutableStateOf<String?>(null) }

    val colors = listOf(
        "#FF6B6B", "#FF9999", "#FFB347", "#FFC154",
        "#FFDA75", "#A0E7E5", "#7FDBCA", "#6C63FF",
        "#A78BFA"
    )

    val templates = listOf(
        "Watch Later", "TV & Film", "Inspo", "Ideas",
        "Wishlist", "Learn", "Places", "Funny"
    )

    Dialog(onDismissRequest = onDismiss) {
        Box(
            modifier = Modifier
                .background(
                    MaterialTheme.colorScheme.surface,
                    shape = RoundedCornerShape(16.dp)
                )
                .padding(24.dp)
                .fillMaxWidth(0.9f)
        ) {
            Column(
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    "New Stash",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )

                Text("🍕 Tap to change", fontSize = 12.sp, color = MaterialTheme.colorScheme.outline)

                OutlinedTextField(
                    value = stashName.value,
                    onValueChange = { stashName.value = it },
                    label = { Text("Name your stash...") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Text("Choose Color", fontWeight = FontWeight.Medium, fontSize = 12.sp)

                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    for (i in colors.indices step 5) {
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            for (j in i until minOf(i + 5, colors.size)) {
                                val color = colors[j]
                                Box(
                                    modifier = Modifier
                                        .size(40.dp)
                                        .background(
                                            parseColor(color),
                                            shape = RoundedCornerShape(8.dp)
                                        )
                                        .clickable { selectedColor.value = color },
                                    contentAlignment = Alignment.Center
                                ) {
                                    if (selectedColor.value == color) {
                                        Icon(
                                            Icons.Default.Add,
                                            contentDescription = null,
                                            tint = Color.White,
                                            modifier = Modifier.size(20.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }
                }

                Text("Or pick a popular one", fontWeight = FontWeight.Medium, fontSize = 12.sp)

                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    for (i in templates.indices step 2) {
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            for (j in i until minOf(i + 2, templates.size)) {
                                val template = templates[j]
                                Button(
                                    onClick = { selectedTemplate.value = template },
                                    modifier = Modifier
                                        .weight(1f)
                                ) {
                                    Text(template, fontSize = 10.sp)
                                }
                            }
                        }
                    }
                }

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 16.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = onDismiss,
                        modifier = Modifier.weight(1f)
                    ) {
                        Text("Cancel")
                    }
                    Button(
                        onClick = { onSave(stashName.value, selectedColor.value) },
                        modifier = Modifier.weight(1f),
                        enabled = stashName.value.isNotBlank()
                    ) {
                        Text("Create")
                    }
                }
            }
        }
    }
}

