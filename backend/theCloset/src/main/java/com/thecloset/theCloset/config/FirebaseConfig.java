package com.thecloset.theCloset.config;

import org.springframework.beans.factory.annotation.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

/*@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init() throws IOException {
        InputStream serviceAccount = getClass().getClassLoader()
                .getResourceAsStream("serviceAccountKey.json");

        if (serviceAccount == null) {
            throw new IOException("serviceAccountKey.json not found");
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}*/

@Configuration
public class FirebaseConfig {
    @Value("${FIREBASE_KEY_B64:}") private String keyB64;

    @PostConstruct void init() throws Exception {
        if (keyB64.isBlank()) {
            throw new IllegalStateException("FIREBASE_KEY_B64 not set");
        } byte[] json = java.util.Base64.getDecoder().decode(keyB64);

        java.nio.file.Path tmp = java.nio.file.Files.createTempFile("fb", ".json");
        java.nio.file.Files.write(tmp, json); try (var in = new java.io.FileInputStream(tmp.toFile())) { FirebaseOptions opts = FirebaseOptions.builder() .setCredentials(GoogleCredentials.fromStream(in)) .build();
            if (FirebaseApp.getApps().isEmpty()) { FirebaseApp.initializeApp(opts); } } } }
