package com.thecloset.theCloset.controller;

import com.thecloset.theCloset.DTO.ClothingItemDTO;
import com.thecloset.theCloset.model.ClothingItem;
import com.thecloset.theCloset.model.Outfit;
import com.thecloset.theCloset.model.User;
import com.thecloset.theCloset.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String idToken = authHeader.substring(7);

        try {
            // Verify the ID token using Firebase Admin SDK
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid(); // Get the UID from the decoded token

            // Find the user in your database by UID
            Optional<User> user = userService.findByUid(uid);
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());  // Return the current user
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // If no user is found
            }

        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // If token verification fails
        }
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/outfits")
    public ResponseEntity<List<Outfit>> getUserOutfits(@PathVariable Integer id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(user.getOutfits()))
                .orElse(ResponseEntity.notFound().build());
    }

    /*@GetMapping("/{id}/items")
    public ResponseEntity<List<ClothingItem>> getUserClothingItems(@PathVariable Integer id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(user.getClothingItems()))
                .orElse(ResponseEntity.notFound().build());
    }*/

    @GetMapping("/{id}/items")
    public ResponseEntity<List<ClothingItemDTO>> getUserClothingItems(@PathVariable Integer id) {
        return userService.getUserById(id)
                .map(user -> {
                    List<ClothingItemDTO> dtoList = user.getClothingItems().stream()
                            .map(ClothingItemDTO::new)
                            .toList();
                    return ResponseEntity.ok(dtoList);
                })
                .orElse(ResponseEntity.notFound().build());
    }



    @PostMapping
    public ResponseEntity<User> registerOrLoginUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String idToken = authHeader.substring(7);

        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String name = (String) decodedToken.getClaims().get("name");

            // Check if user already exists
            Optional<User> existingUser = userService.findByUid(uid);
            if (existingUser.isPresent()) {
                try {
                    String json = new ObjectMapper().writeValueAsString(existingUser.get());
                    System.out.println("📤 Backend šalje korisnika (postoji): " + json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return ResponseEntity.ok(existingUser.get());
            }

            // Otherwise create and save user
            User savedUser = userService.registerFirebaseUser(uid, email, name);
            try {
                String json = new ObjectMapper().writeValueAsString(savedUser);
                System.out.println("📤 Backend šalje korisnika (novi): " + json);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
