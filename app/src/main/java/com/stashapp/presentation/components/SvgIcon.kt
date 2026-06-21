package com.stashapp.presentation.components

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color

// Use BellIcon and SearchIcon from CustomIcons.kt for icon implementations
// These files serve as wrappers around Material Design icons

@Composable
fun SvgIconBell(
    modifier: Modifier = Modifier,
    tint: Color = Color.Black
) {
    BellIcon(modifier = modifier, tint = tint)
}

@Composable
fun SvgIconSearch(
    modifier: Modifier = Modifier,
    tint: Color = Color.Black
) {
    SearchIcon(modifier = modifier, tint = tint)
}
