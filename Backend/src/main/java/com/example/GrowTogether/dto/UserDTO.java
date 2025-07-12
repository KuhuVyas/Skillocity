package com.example.GrowTogether.dto;

import java.util.List;

public class UserDTO {

    private String name;
    private String location;
    private String profilePhotoUrl;
    private String availability;
    private boolean isPublic;
    private List<String> skillsOffered;
    private List<String> skillsWanted;

    private String email;      // ✅ newly added
    private String password;   // ✅ newly added

    // 🔽 Constructors
    public UserDTO() {}

    public UserDTO(String name, String location, String profilePhotoUrl, String availability,
                   boolean isPublic, List<String> skillsOffered, List<String> skillsWanted,
                   String email, String password) {
        this.name = name;
        this.location = location;
        this.profilePhotoUrl = profilePhotoUrl;
        this.availability = availability;
        this.isPublic = isPublic;
        this.skillsOffered = skillsOffered;
        this.skillsWanted = skillsWanted;
        this.email = email;
        this.password = password;
    }

    // 🔽 Getters and Setters
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

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}