package com.thecloset.theCloset.config;

import com.thecloset.theCloset.security.FirebaseTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final FirebaseTokenFilter firebaseTokenFilter;

    public SecurityConfig(FirebaseTokenFilter firebaseTokenFilter) {
        this.firebaseTokenFilter = firebaseTokenFilter;
    }
    @Value("${app.security.disabled:false}")
    private boolean securityDisabled;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("📢 Security disabled? " + securityDisabled);

        if (securityDisabled) {
            // 🚧 DEVELOPMENT MOD – sve otvoreno
            http.cors(cors -> {}).csrf(csrf -> csrf.disable())
                    .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        } else {
            // 🔒 PRODUCTION MOD – koristi Firebase autentikaciju
            http.cors(cors -> {}).csrf(csrf -> csrf.disable())
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/**").permitAll()
                            .anyRequest().authenticated()
                    )
                    .addFilterBefore(firebaseTokenFilter, UsernamePasswordAuthenticationFilter.class);
        }

        return http.build();
    }

}

