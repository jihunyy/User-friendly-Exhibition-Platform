package com.example.backend.controller;


import com.example.backend.config.JWTUtil;
import com.example.backend.model.dto.*;
import com.example.backend.model.entity.User;
import com.example.backend.service.EmailConfirmationTokenService;
import com.example.backend.service.S3Service;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final EmailConfirmationTokenService emailConfirmationTokenService;


    @PostMapping("/sign-up")
    private Object signUp(@RequestBody RegisterDto registerDto){

        try{
            User user=userService.makeUser(registerDto);
            emailConfirmationTokenService.createEmailConfirmationToken(user.getId(), user.getUsername());
            return new LoginFailDto(true,"이메일을 확인해주세요",user);
        }catch(IllegalArgumentException e){
            return new LoginFailDto(false,e.getMessage(),null);
        }

    }
    @PostMapping("/sign-in")
    private Object signIn(@RequestBody LoginDto loginDto, HttpServletRequest request,
                        HttpServletResponse response){
        try {
            User user = userService.getValidUser(loginDto);
            response.setHeader("auth_token", JWTUtil.makeAuthToken(user));
            response.setHeader("refresh_token", JWTUtil.makeRefreshToken(user));
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            return new LoginFailDto(true,"로그인 성공",user);
        }catch(IllegalArgumentException e){
            return new LoginFailDto(false,e.getMessage(),null);
        }
    }


    @GetMapping("/confirm-email")
    public RedirectView viewConfirmEmail(@RequestParam  String token){

        boolean result = userService.confirmEmail(token);
        if (result){
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl("http://localhost:3000/welcome");
            return redirectView;
        }
        else{
            return null;
        }


    }


    @GetMapping("/user/user-info")
    private User UserInfo(Principal principal){
        System.out.println(principal);
        return userService.getUser(principal.getName());
    }

    @PostMapping("/user/user-info")
    public NicknameChangeSuccessDto UserInfoChange(@RequestBody NicknameConfirmDto nicknameConfirmDto, Principal principal){;
        String nickname= nicknameConfirmDto.getNickname();
        if(userService.existNickname(nickname)){
            return new NicknameChangeSuccessDto(false);//"이미 있음";
        }
        User user=userService.getUser(principal.getName());
        userService.changeNickname(nickname, user.getNickname());
        if(userService.existNickname(nickname)){
            return new NicknameChangeSuccessDto(true);//"닉네임 바꾸기 성공";
        }
        return new NicknameChangeSuccessDto(false);
    }

    @PostMapping(value = "/user/change-profile")
    public ProfileChangeSuccessDto UserProfileChange(@RequestParam MultipartFile profile, Principal principal) throws Exception{

        User user=userService.getUser(principal.getName());

        String newProfileURL =userService.changeImage(user,profile);
//        ClassPathResource resource=new ClassPathResource("static/");
//        Path path= Paths.get(resource.getURI());
//
//        System.out.println(path);
//
//        UUID uuid=UUID.randomUUID();
//        String fileName=uuid.toString()+"_"+profile.getOriginalFilename();
//        profile.transferTo(new File(path.toString()+"/profile/"+fileName));
//
//        User user=userService.getUser(principal.getName());
//
//        String newProfileURL=userService.changeImage(user, fileName, path.toString());
//
//        if (newProfileURL==null){
//            return new ProfileChangeSuccessDto(false, null);
//        }
        return new ProfileChangeSuccessDto(true, newProfileURL);
    }


}
