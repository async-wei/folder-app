# Retrofit
-keep class com.squareup.retrofit2.** { *; }
-keep interface com.squareup.retrofit2.** { *; }
-keepattributes Exceptions
-keepattributes Signature
-keepattributes EnclosingMethod

# OkHttp
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-keepattributes Exceptions

# Gson
-keep class com.google.gson.** { *; }
-keep interface com.google.gson.** { *; }
-keep class sun.misc.Unsafe { *; }

# Room
-keep class androidx.room.Room { *; }
-keepclassmembers class * {
    @androidx.room.* <fields>;
}

# Hilt
-keep class dagger.hilt.** { *; }
-keep interface dagger.hilt.** { *; }
-keep @dagger.hilt.android.HiltAndroidApp class *
-keepclasseswithmembernames class * {
    @dagger.hilt.android.lifecycle.HiltViewModel <methods>;
}

# Kotlin
-keep class kotlin.** { *; }
-keep interface kotlin.** { *; }
-keepclassmembers class kotlin.** {
  *** **(...);
}

# Kotlin Coroutines
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
-keepnames class kotlinx.coroutines.android.AndroidExceptionPreHandler {}
-keepclassmembernames class kotlinx.** {
    volatile <fields>;
}

-dontwarn sun.misc.**
-dontwarn kotlinx.**
-dontwarn okhttp3.**
-dontwarn javax.annotation.**
