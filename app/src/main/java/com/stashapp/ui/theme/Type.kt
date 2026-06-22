package com.stashapp.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.stashapp.R

val SanFranciscoFontFamily = FontFamily(
    Font(R.font.sf_regular, FontWeight.Normal),
    Font(R.font.sf_medium, FontWeight.W500),
    Font(R.font.sf_semibold, FontWeight.SemiBold),
    Font(R.font.sf_bold, FontWeight.Bold)
)

val Typography = Typography(
    displayLarge = TextStyle(
        fontFamily = SanFranciscoFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 32.sp
    ),
    headlineSmall = TextStyle(
        fontFamily = SanFranciscoFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 24.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = SanFranciscoFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp
    )
)
