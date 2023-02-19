package com.example.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="user")
public class User implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String username;

    private String password;

    private String role;

    private String nickname;

    private String profile;

    private boolean emailAuth=false;

    public boolean getEmailAuth(){
        return emailAuth;
    }
    public void setEmailAuth(boolean auth){
        this.emailAuth=auth;
    }


    @OneToMany(mappedBy = "user",fetch=FetchType.LAZY,cascade = {CascadeType.ALL})
    private List<OnlineExhibition> onlineExhibition = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",fetch=FetchType.LAZY,cascade = {CascadeType.ALL})
    private List<Comment> comments = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "user",fetch=FetchType.LAZY,cascade = {CascadeType.ALL})
    private List<Good> likes = new ArrayList<>();

    private boolean enabled;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> auth = new ArrayList<GrantedAuthority>();
        auth.add(new SimpleGrantedAuthority(role));

        return auth;
    }


    @Override
    public boolean isAccountNonExpired() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
