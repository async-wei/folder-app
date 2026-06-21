package com.stashapp.presentation.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp

@Composable
fun BellIcon(
    modifier: Modifier = Modifier,
    tint: Color = Color.Black
) {
    Icon(
        imageVector = Icons.Default.Notifications,
        contentDescription = "Notifications",
        modifier = modifier,
        tint = tint
    )
}

@Composable
fun SearchIcon(
    modifier: Modifier = Modifier,
    tint: Color = Color.Black
) {
    Icon(
        imageVector = Icons.Default.Search,
        contentDescription = "Search",
        modifier = modifier,
        tint = tint
    )
}
