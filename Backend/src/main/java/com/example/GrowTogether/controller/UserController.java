package com.example.GrowTogether.controller;


import com.example.GrowTogether.dto.UserDTO;
import com.example.GrowTogether.entity.User;
import com.example.GrowTogether.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 🔐 Only logged-in users can create user data
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO dto, @AuthenticationPrincipal Jwt jwt) {
        // Get email from JWT (issued by Clerk)
        String email = jwt.getClaim("email");
        System.out.println("Authenticated user email: " + email);

        // You could optionally save the email from Clerk into the new User
        dto.setEmail(email);
        return ResponseEntity.ok(userService.createUser(dto));
    }

    // ✅ Public endpoint
    @GetMapping("/public")
    public ResponseEntity<List<User>> getPublicUsers() {
        return ResponseEntity.ok(userService.getPublicUsers());
    }

    // 🔐 Secure: Only authenticated users
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        System.out.println("Authenticated user: " + jwt.getSubject());
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO dto, @AuthenticationPrincipal Jwt jwt) {
        System.out.println("Authenticated user for update: " + jwt.getSubject());
        return userService.updateUser(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        System.out.println("Authenticated user for delete: " + jwt.getSubject());
        return userService.deleteUser(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}