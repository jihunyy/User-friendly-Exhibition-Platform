package com.example.backend.service;

import com.example.backend.model.dto.LoginDto;
import com.example.backend.model.dto.RegisterDto;
import com.example.backend.model.entity.EmailConfirmationToken;
import com.example.backend.model.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailConfirmationTokenService emailConfirmationTokenService;
    private final S3Service s3Service;
    @Value("${server.host}")
    private String hostURL;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username).orElseThrow(
                ()->new UsernameNotFoundException(username));
    }

    public User makeUser(RegisterDto registerDto){

        String username= registerDto.getUsername();
        String nickname= registerDto.getNickname();
        String password1= registerDto.getPassword1();
        String password2=registerDto.getPassword2();

        if(userRepository.existsUserByUsername(username)){
            User user=userRepository.getUserByUsername(username);

            if(!user.getEmailAuth()){
                emailConfirmationTokenService.createEmailConfirmationToken(user.getId(), user.getUsername());
                throw new IllegalArgumentException("이메일 인증이 완료되지 않았습니다.새로운 인증 메일을 보냅니다.");
            }
            throw new IllegalArgumentException("이미 가입된 이메일 입니다.");
        }
        if(userRepository.existsUserByNickname(nickname)){
            throw new IllegalArgumentException("이미 존재하는 닉네임 입니다.");
        }
        if(!passwordEncoder.matches(password1, password2)){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        User newUser=User.builder()
                .username(username)
                .nickname(nickname)
                .password(passwordEncoder.encode(password1))
                .role("ROLE_USER")
                .enabled(true)
                .build();

        return userRepository.save(newUser);
    }


    public User getValidUser(LoginDto loginDto){
        String username= loginDto.getUsername();
        String password=loginDto.getPassword();
        User target;
        target=userRepository.findUserByUsername(username).orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));
        if (!passwordEncoder.matches(password, target.getPassword())){
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        if(!target.getEmailAuth()){
            emailConfirmationTokenService.createEmailConfirmationToken(target.getId(), target.getUsername());
            throw new IllegalArgumentException("이메일 인증이 완료되지 않았습니다.새로운 인증 메일을 보냅니다.");
        }
        return target;

    }
    public boolean confirmEmail(String token) {
        try{
            EmailConfirmationToken findConfirmationToken = emailConfirmationTokenService.findByIdAndExpirationDateAfterAndExpired(token);
            System.out.println(findConfirmationToken);
            User target = userRepository.findUserById(findConfirmationToken.getUserId());
            findConfirmationToken.useToken();	// 토큰 만료 로직을 구현해주면 된다. ex) expired 값을 true로 변경
            target.setEmailAuth(true);	// 유저의 이메일 인증 값 변경 로직을 구현해주면 된다. ex) emailVerified 값을 true로 변경
            return true;
        }
        catch (Exception e){
            System.out.println(e);
            return false;
        }
    }
    public User getUser(String username){
        return userRepository.getUserByUsername(username);
    }

    public boolean existNickname(String nickname){

        return userRepository.existsUserByNickname(nickname);

    }

    public void changeNickname(String newNickname, String originalNickname){
        User user=userRepository.findUserByNickname(originalNickname);
        user.setNickname(newNickname);

        userRepository.save(user);

    }
    //s3
    public  String changeImage(User user, MultipartFile file) throws IOException {

        String profileURL =s3Service.upload(file,"profile");
        if (user.getProfile()!=null){
            String existProfileURL=user.getProfile();
            s3Service.deleteS3File(existProfileURL);
        }
        user.setProfile(profileURL);
        userRepository.save(user);
        return profileURL;

    }
    //local
    public String changeImage(User user, String filename, String filepath){
        String profileURL=hostURL+"/static/profile/"+filename;
        if(user.getProfile()==null){
            user.setProfile(profileURL);
            userRepository.save(user);
            return profileURL;
        }else{
            String existProfileURL=user.getProfile();
            String existFilename=existProfileURL.substring(existProfileURL.lastIndexOf("/")+1);
            File file=new File(filepath+"/profile/"+existFilename);
            if(file.exists()){
                if(file.delete()){

                }else{
                    return null;
                }
            }
            user.setProfile(profileURL);
            userRepository.save(user);
            return profileURL;
        }


    }

}
