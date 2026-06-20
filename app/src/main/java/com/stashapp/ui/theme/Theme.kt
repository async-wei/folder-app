package com.stashapp.ui.theme

import androidx.compose.foundation.isSystemInDarkMode
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColors = lightColorScheme(
    primary = Color(0xFFFF6B6B),
    onPrimary = Color.White,
    primaryContainer = Color(0xFFFFD7D7),
    onPrimaryContainer = Color(0xFF5C0000),
    secondary = Color(0xFF6C5B7B),
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFF0DEFF),
    onSecondaryContainer = Color(0xFF261D37),
    tertiary = Color(0xFF7D5B00),
    onTertiary = Color.White,
    tertiaryContainer = Color(0xFFFFDDB5),
    onTertiaryContainer = Color(0xFF291C00),
    error = Color(0xFFB3261E),
    onError = Color.White,
    errorContainer = Color(0xFFF9DEDC),
    onErrorContainer = Color(0xFF410E0B),
    background = Color(0xFFFFFBFE),
    onBackground = Color(0xFF1F1B1F),
    surface = Color(0xFFFFFBFE),
    onSurface = Color(0xFF1F1B1F),
    surfaceVariant = Color(0xFFEFE1F0),
    onSurfaceVariant = Color(0xFF49454E)
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFFFFB4AB),
    onPrimary = Color(0xFF690000),
    primaryContainer = Color(0xFF920000),
    onPrimaryContainer = Color(0xFFFFD7D7),
    secondary = Color(0xFFD5C3E1),
    onSecondary = Color(0xFF39314E),
    secondaryContainer = Color(0xFF504767),
    onSecondaryContainer = Color(0xFFF0DEFF),
    tertiary = Color(0xFFF5C456),
    onTertiary = Color(0xFF452B00),
    tertiaryContainer = Color(0xFF614100),
    onTertiaryContainer = Color(0xFFFFDDB5),
    error = Color(0xFFF2B8B5),
    onError = Color(0xFF601410),
    errorContainer = Color(0xFF8C1D18),
    onErrorContainer = Color(0xFFF9DEDC),
    background = Color(0xFF1F1B1F),
    onBackground = Color(0xFFE7E0E7),
    surface = Color(0xFF1F1B1F),
    onSurface = Color(0xFFE7E0E7),
    surfaceVariant = Color(0xFF49454E),
    onSurfaceVariant = Color(0xFFCAC7D0)
)

@Composable
fun StashAppTheme(
    darkTheme: Boolean = isSystemInDarkMode(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColors else LightColors

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        shapes = Shapes,
        content = content
    )
}
