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
    primary = Color(0xFFC1703F),           // Red Roo Rust (main color)
    onPrimary = Color.White,
    primaryContainer = Color(0xFFE8D4C8),  // Light rust for highlights
    onPrimaryContainer = Color(0xFFC1703F),

    secondary = Color(0xFF2F6B5E),         // Eucalyptus (deep woodland green)
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFD4E3DD),
    onSecondaryContainer = Color(0xFF2F6B5E),

    tertiary = Color(0xFF9BAA8C),          // Muted plains green
    onTertiary = Color.White,
    tertiaryContainer = Color(0xFFE8EFE0),
    onTertiaryContainer = Color(0xFF9BAA8C),

    error = Color(0xFFC1703F),
    onError = Color.White,
    errorContainer = Color(0xFFE8D4C8),
    onErrorContainer = Color(0xFFC1703F),

    background = Color.White,
    onBackground = Color.Black,

    surface = Color.White,
    onSurface = Color.Black,
    surfaceVariant = Color(0xFFF5F5F5),
    onSurfaceVariant = Color(0xFF999999),

    outline = Color(0xFFCCCCCC),
    outlineVariant = Color(0xFFEEEEEE),
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
