package com.example.GrowTogether.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String name;
    private String location;
    private String profilePhotoUrl;
    private String availability;
    private boolean isPublic;

    @ElementCollection
    private List<String> skillsOffered;

    @ElementCollection
    private List<String> skillsWanted;

    // 🔽 Constructors
    public User() {}

    public User(Long id, String name, String location, String profilePhotoUrl, String availability,
                boolean isPublic, List<String> skillsOffered, List<String> skillsWanted) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.profilePhotoUrl = profilePhotoUrl;
        this.availability = availability;
        this.isPublic = isPublic;
        this.skillsOffered = skillsOffered;
        this.skillsWanted = skillsWanted;
    }

    // 🔽 Getters and Setters (use IDE to generate)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public boolean isPublic() { return isPublic; }
    public void setPublic(boolean aPublic) { isPublic = aPublic; }

    public List<String> getSkillsOffered() { return skillsOffered; }
    public void setSkillsOffered(List<String> skillsOffered) { this.skillsOffered = skillsOffered; }

    public List<String> getSkillsWanted() { return skillsWanted; }
    public void setSkillsWanted(List<String> skillsWanted) { this.skillsWanted = skillsWanted; }
}