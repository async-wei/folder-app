package com.stashapp.ui.theme

import androidx.compose.foundation.background
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.Font
import com.stashapp.R

private val LightColors = lightColorScheme(
    primary = Color(0xFFFF6B6B),           // Coral Red
    onPrimary = Color.White,
    primaryContainer = Color(0xFFFFE5E5),
    onPrimaryContainer = Color(0xFF8B0000),

    secondary = Color(0xFF00D4AA),         // Mint Green
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFB3F5E8),
    onSecondaryContainer = Color(0xFF00664D),

    tertiary = Color(0xFF49CBEB),          // Cyan/Turquoise
    onTertiary = Color.White,
    tertiaryContainer = Color(0xFFD4F8FF),
    onTertiaryContainer = Color(0xFF005B7D),

    error = Color(0xFFBA1A1A),
    onError = Color.White,
    errorContainer = Color(0xFFFFDAD6),
    onErrorContainer = Color(0xFF410E0B),

    background = Color(0xFFFAFAFA),        // Light background
    onBackground = Color(0xFF1C1C1C),

    surface = Color.White,
    onSurface = Color(0xFF1C1C1C),
    surfaceVariant = Color(0xFFF0F0F0),
    onSurfaceVariant = Color(0xFF7A7A7A),

    outline = Color(0xFFB3B3B3),
    outlineVariant = Color(0xFFD9D9D9),
)

@Composable
fun StashAppTheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColors,
        typography = Typography,
        shapes = Shapes,
        content = content
    )
}
