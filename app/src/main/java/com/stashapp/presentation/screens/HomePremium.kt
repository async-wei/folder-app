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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.text.input.ImeAction
import com.stashapp.data.database.StashEntity
import com.stashapp.presentation.viewmodels.StashViewModel

@Composable
fun HomePremium(
    viewModel: StashViewModel,
    onStashClick: (Int) -> Unit,
    onSearchClick: () -> Unit
) {
    val stashes = viewModel.stashes.collectAsState().value
    val itemCounts = viewModel.itemCounts.collectAsState().value
    val showCreateDialog = remember { mutableStateOf(false) }

    if (showCreateDialog.value) {
        CreateStashDialogPremium(
            onDismiss = { showCreateDialog.value = false },
            onSave = { name, color ->
                viewModel.createStash(name, "", color)
                showCreateDialog.value = false
            }
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
    ) {
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(24.dp),
            contentPadding = androidx.compose.foundation.layout.PaddingValues(
                top = 16.dp,
                bottom = 100.dp,
                start = 20.dp,
                end = 20.dp
            )
        ) {
            // Header with greeting and notification
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Hello, User 👋",
                            fontSize = 28.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.Black
                        )
                    }

                    // Notification bell icon in circle
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .background(
                                color = Color(0xFFF5F5F5),
                                shape = CircleShape
                            )
                            .clickable { /* TODO: Show notifications */ },
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Default.Notifications,
                            contentDescription = "Notifications",
                            tint = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                }
            }

            // Search bar
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                        .background(
                            color = Color(0xFFF5F5F5),
                            shape = RoundedCornerShape(12.dp)
                        )
                        .clickable(onClick = onSearchClick),
                    contentAlignment = Alignment.CenterStart
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            "🔍",
                            fontSize = 18.sp
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Text(
                            "Search",
                            fontSize = 16.sp,
                            color = Color(0xFFAAAAAA)
                        )
                    }
                }
            }

            // Your Stashes Section
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Your Stashes",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.Black
                    )
                    Text(
                        text = "${stashes.size} stashes",
                        fontSize = 13.sp,
                        color = Color(0xFF999999)
                    )
                }
            }

            // Stash Cards
            item {
                if (stashes.isEmpty()) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(150.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            "No stashes yet. Tap + to create one.",
                            fontSize = 14.sp,
                            color = Color(0xFF999999)
                        )
                    }
                } else {
                    Column(
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        for (i in stashes.indices step 2) {
                            Row(
                                horizontalArrangement = Arrangement.spacedBy(12.dp),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                for (j in i until minOf(i + 2, stashes.size)) {
                                    val stash = stashes[j]
                                    Box(modifier = Modifier.weight(1f)) {
                                        StashCardPremium(
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

        // FAB positioned at bottom
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(20.dp),
            contentAlignment = Alignment.BottomEnd
        ) {
            FloatingActionButton(
                onClick = { showCreateDialog.value = true },
                containerColor = MaterialTheme.colorScheme.primary,
                shape = CircleShape,
                modifier = Modifier.size(56.dp)
            ) {
                Icon(
                    Icons.Default.Add,
                    contentDescription = "Add Stash",
                    tint = Color.White,
                    modifier = Modifier.size(24.dp)
                )
            }
        }
    }
}

@Composable
fun StashCardPremium(
    stash: StashEntity,
    itemCount: Int,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(140.dp)
            .background(
                color = parseColor(stash.color),
                shape = RoundedCornerShape(16.dp)
            )
            .clickable(onClick = onClick)
            .padding(16.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = stash.name,
                fontSize = 15.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = "$itemCount item${if (itemCount != 1) "s" else ""}",
                fontSize = 12.sp,
                color = Color.White.copy(alpha = 0.85f)
            )
        }
    }
}

@Composable
fun CreateStashDialogPremium(
    onDismiss: () -> Unit,
    onSave: (String, String) -> Unit
) {
    val stashName = remember { mutableStateOf("") }
    val selectedColor = remember { mutableStateOf("#FF6B6B") }

    val colors = listOf(
        "#FF6B6B", "#FF9999", "#FFB347", "#FFC154",
        "#FFDA75", "#A0E7E5", "#7FDBCA", "#6C63FF",
        "#A78BFA"
    )

    Dialog(onDismissRequest = onDismiss) {
        Box(
            modifier = Modifier
                .background(
                    Color.White,
                    shape = RoundedCornerShape(20.dp)
                )
                .padding(24.dp)
                .fillMaxWidth(0.85f)
        ) {
            Column(
                verticalArrangement = Arrangement.spacedBy(20.dp)
            ) {
                Text(
                    "Create New Stash",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Black
                )

                OutlinedTextField(
                    value = stashName.value,
                    onValueChange = { stashName.value = it },
                    label = { Text("Stash Name") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true,
                    shape = RoundedCornerShape(12.dp)
                )

                Text(
                    "Choose Color",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color.Black
                )

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

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Button(
                        onClick = onDismiss,
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text("Cancel")
                    }
                    Button(
                        onClick = { onSave(stashName.value, selectedColor.value) },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(10.dp),
                        enabled = stashName.value.isNotBlank()
                    ) {
                        Text("Create")
                    }
                }
            }
        }
    }
}
