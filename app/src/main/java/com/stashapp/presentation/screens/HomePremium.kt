package com.stashapp.presentation.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.stashapp.data.database.StashEntity
import com.stashapp.presentation.components.BellIcon
import com.stashapp.presentation.components.CreateStashDialogPremium
import com.stashapp.presentation.components.SearchIcon
import com.stashapp.presentation.viewmodels.StashViewModel

@Composable
fun HomePremium(
    viewModel: StashViewModel,
    onStashClick: (String) -> Unit,
    onSearchClick: () -> Unit
) {
    val stashes by viewModel.stashes.collectAsState(initial = emptyList())
    var showCreateDialog by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(start = 20.dp, end = 20.dp, top = 16.dp, bottom = 0.dp)
        ) {
            // Top padding for notch - add extra space
            Spacer(modifier = Modifier.height(20.dp))

            // Header with greeting and notification icon
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Hello, User 👋",
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Black
                )

                // Notification icon with circle background
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .background(Color(0xFFF0F0F0), shape = CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    BellIcon(
                        modifier = Modifier.size(24.dp),
                        tint = Color.Black
                    )
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Search bar
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp)
                    .background(Color(0xFFF5F5F5), shape = RoundedCornerShape(12.dp))
                    .clickable(
                        indication = null,
                        interactionSource = remember { MutableInteractionSource() }
                    ) {
                        onSearchClick()
                    },
                contentAlignment = Alignment.CenterStart
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Start
                ) {
                    SearchIcon(
                        modifier = Modifier.size(20.dp),
                        tint = Color(0xFF999999)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = "Search",
                        fontSize = 16.sp,
                        color = Color(0xFF999999)
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Your Stashes header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 0.dp),
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
                    text = "${stashes.size} Stashes",
                    fontSize = 13.sp,
                    color = Color(0xFF999999)
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Stashes grid
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                for (i in stashes.indices step 2) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        StashCardPremium(
                            stash = stashes[i],
                            modifier = Modifier.weight(1f),
                            onClick = { onStashClick(stashes[i].id.toString()) }
                        )
                        if (i + 1 < stashes.size) {
                            StashCardPremium(
                                stash = stashes[i + 1],
                                modifier = Modifier.weight(1f),
                                onClick = { onStashClick(stashes[i + 1].id.toString()) }
                            )
                        } else {
                            Spacer(modifier = Modifier.weight(1f))
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(80.dp))
        }

        // FAB positioned at bottom right
        FloatingActionButton(
            onClick = { showCreateDialog = true },
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(end = 20.dp, bottom = 80.dp),
            containerColor = Color.Black,
            contentColor = Color.White
        ) {
            androidx.compose.material3.Icon(
                imageVector = Icons.Default.Add,
                contentDescription = "Create Stash",
                modifier = Modifier.size(24.dp)
            )
        }
    }

    if (showCreateDialog) {
        CreateStashDialogPremium(
            onDismiss = { showCreateDialog = false },
            onCreate = { name, color ->
                viewModel.createStash(name, color)
                showCreateDialog = false
            }
        )
    }
}

@Composable
fun StashCardPremium(
    stash: StashEntity,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    val colorLong = try {
        stash.color.replace("#", "").toLong(16) or 0xFF000000L
    } catch (e: Exception) {
        0xFFFF6B6BL
    }

    Box(
        modifier = modifier
            .height(140.dp)
            .background(
                color = Color(colorLong),
                shape = RoundedCornerShape(16.dp)
            )
            .clickable(
                indication = null,
                interactionSource = remember { MutableInteractionSource() }
            ) {
                onClick()
            }
            .padding(16.dp),
        contentAlignment = Alignment.BottomStart
    ) {
        Column(verticalArrangement = Arrangement.Bottom) {
            Text(
                text = stash.name,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "${stash.itemCount} items",
                fontSize = 12.sp,
                color = Color.White.copy(alpha = 0.8f)
            )
        }
    }
}
