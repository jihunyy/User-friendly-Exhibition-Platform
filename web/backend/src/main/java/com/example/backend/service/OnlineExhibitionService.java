package com.example.backend.service;

import com.example.backend.model.dto.*;
import com.example.backend.model.entity.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ReactiveAdapterRegistry;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Component
public class OnlineExhibitionService {

    private final OnlineExhibitionRepository onlineExhibitionRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final ContentRepository contentRepository;

    public List<OnlineExhibitionDto> showAllOnlineExhibition(){
        List<OnlineExhibitionDto> result=new ArrayList<>();
        onlineExhibitionRepository.findAllByStepGreaterThan(4).forEach((data)->{
            result.add(OnlineExhibitionDto.builder()
                            .id(data.getId())
                            .title(data.getTitle())
                            .description(data.getDescription())
                            .startDate(data.getStartDate())
                            .endDate(data.getEndDate())
                            .tag1(data.getTag1())
                            .tag2(data.getTag2())
                            .tag3(data.getTag3())
                            .poster(data.getPoster())
                            .likeCount(data.getLikeCount())
                            .author(data.getUser().getNickname())
                    .build());
        });
        return result;
    }
    public List<OnlineExhibitionDto> showMySavedOnlineExhibition(User user){
        List<OnlineExhibitionDto> result=new ArrayList<>();
        onlineExhibitionRepository.findAllByUserAndStepLessThan(user,5).forEach((data)->{
            result.add(OnlineExhibitionDto.builder()
                    .id(data.getId())
                    .title(data.getTitle())
                    .description(data.getDescription())
                    .startDate(data.getStartDate())
                    .endDate(data.getEndDate())
                    .tag1(data.getTag1())
                    .tag2(data.getTag2())
                    .tag3(data.getTag3())
                    .poster(data.getPoster())
                    .likeCount(data.getLikeCount())
                    .author(data.getUser().getNickname())
                    .step(data.getStep())
                    .build());
        });
        return result;
    }
    public Boolean isHeartClicked(Long onlineExhibitionId, Principal user){
        OnlineExhibition onlineExhibition=onlineExhibitionRepository.findOnlineExhibitionById(onlineExhibitionId);
        List<Good> goods=onlineExhibition.getLikes();

        for (Good good : goods) {
            if(good.getUser().getUsername().equals(user.getName())){
                return true;
            }
        }
        return false;
    }

    public int getHeartCount(Long onlineExhibitionId){
        OnlineExhibition onlineExhibition=onlineExhibitionRepository.findOnlineExhibitionById(onlineExhibitionId);
        return onlineExhibition.getLikeCount();
    }

    public boolean heartUpdate(Long onlineExhibitionId, Principal principal, boolean heartCondition, int likeCount) {
        try {
            OnlineExhibition onlineExhibition = onlineExhibitionRepository.findOnlineExhibitionById(onlineExhibitionId);
            List<Good> goods = onlineExhibition.getLikes();
            System.out.println(goods);
            if (heartCondition == true) {
                System.out.println(1);
                User user=userRepository.findUserByUsername(principal.getName()).get();
                Good goodt = new Good(onlineExhibitionId, true, onlineExhibition, user);
                goods.add(goodt);
                onlineExhibition.setLikes(goods);
                onlineExhibition.setLikeCount(onlineExhibition.getLikeCount()+1);
                onlineExhibitionRepository.save(onlineExhibition);

                return true;
            } else {
                for (Good good : goods) {
                    System.out.println(2);
                    if (good.getUser().getUsername().equals( principal.getName())) {
                        System.out.println(3);
                        goods.remove(good);
                        likeRepository.delete(good);
                        onlineExhibition.setLikeCount(onlineExhibition.getLikeCount()-1);
                        onlineExhibitionRepository.save(onlineExhibition);

                        return true;
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("error: " + e.getMessage());
        }
        return false;
    }
    public List<CommentDto> findAllComments(Long id){

        Optional<OnlineExhibition> onlineExhibition=onlineExhibitionRepository.findById(id);
        List<CommentDto> comments=new ArrayList<>();
        onlineExhibition.get().getComments().forEach((comment)->{
            comments.add(CommentDto.builder()
                            .username(comment.getUser().getUsername())
                            .nickname(comment.getUser().getNickname())
                            .description(comment.getDescription())
                            .profile(comment.getUser().getProfile())
                            .id(comment.getId())
                            .build());
        });
        return comments;
    }

    public CommentDto makeComment(CommentReqDto commentReqDto,Principal principal){

        OnlineExhibition onlineExhibition=onlineExhibitionRepository.findById(commentReqDto.getOnlineExhibitionId()).get();
        User user=userRepository.findUserByUsername(principal.getName()).get();
        Comment comment=Comment.builder()
                .onlineExhibition(onlineExhibition)
                .description(commentReqDto.getDescription())
                .user(user)
                .build();
        onlineExhibition.getComments().add(comment);
        onlineExhibitionRepository.save(onlineExhibition);
//        commentRepository.save(comment);
        return CommentDto.builder()
                .profile(user.getProfile())
                .description(comment.getDescription())
                .nickname(user.getNickname())
                .username(user.getUsername())
                .id(comment.getId()).build();
    }

    public Boolean deleteComment(Long id){

        try{
            commentRepository.deleteById(id);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }

    public OnlineExhibition makeOnlineExhibition(OnlineExhibitionDto onlineExhibitionDto, Principal principal) throws IOException {
        int step=onlineExhibitionDto.getStep();
        String title=onlineExhibitionDto.getTitle();
        String tag1=onlineExhibitionDto.getTag1();
        String tag2=onlineExhibitionDto.getTag2();
        String tag3=onlineExhibitionDto.getTag3();
        String poster=onlineExhibitionDto.getPoster();
        String description=onlineExhibitionDto.getDescription();
        User user=userRepository.findUserByUsername(principal.getName()).get();

        OnlineExhibition onlineExhibition = OnlineExhibition.builder()
                .step(step)
                .title(title)
                .tag1(tag1)
                .tag2(tag2)
                .tag3(tag3)
                .description(description)
                .poster(poster)
                .user(user)
                .build();

        return onlineExhibitionRepository.save(onlineExhibition);
    }

    public String savePoster(MultipartFile file) throws IOException {
        String posterURL =s3Service.upload(file,"poster");
        return posterURL;
    }

    public Boolean saveCurrentExhibition(OnlineExhibition onlineExhibition, Principal principal){
        User user=userRepository.findUserByUsername(principal.getName()).get(); // User 정보

        //OnlineExhibition onlineExhibition
        return false;
    }
    @Transactional()
    public List<Long> getDeleteList(Long id,List<Integer> orderID){
        OnlineExhibition onlineExhibition=onlineExhibitionRepository.findById(id).get();
        List<Integer> deleteList=new ArrayList<>();
        List<Long> rt=new ArrayList<>();
        onlineExhibition.getContents().forEach(content->{
            if(!orderID.contains(content.getOrderId())){
                deleteList.add(content.getOrderId());
            }
        });

        deleteList.forEach(deleteID->
        {
            System.out.println(deleteID);
            Long deleteId=contentRepository.findByOnlineExhibitionAndOrderId(onlineExhibition,deleteID).getId();
            rt.add(deleteId);
        });
        return rt;
    }
    @Transactional
    public OnlineExhibition saveStep2(Long id, List<ContentDto> contentDtos, int step,List<Integer> orderID){


        try{
            OnlineExhibition onlineExhibition=onlineExhibitionRepository.findById(id).get();

            for (int i=0;i<contentDtos.size();i++){
                //원래 있을때
                try {
                    Content content = contentRepository.findByOnlineExhibitionAndOrderId(onlineExhibition, contentDtos.get(i).getOrderId());
                    content.setContentType(contentDtos.get(i).getContentType());
                    content.setDescription(contentDtos.get(i).getDescription());
                    if(contentDtos.get(i).getLink()!=null){
                        content.setLink(saveContents(contentDtos.get(i).getLink()));
                    }
                    contentRepository.save(content);
                }catch(Exception e){
                    Content content=new Content();
                    content.setOrderId(contentDtos.get(i).getOrderId());
                    content.setOnlineExhibition(onlineExhibition);
                    content.setContentType(contentDtos.get(i).getContentType());
                    content.setDescription(contentDtos.get(i).getDescription());
                    if(contentDtos.get(i).getLink()!=null){
                        content.setLink(saveContents(contentDtos.get(i).getLink()));
                    }
                    contentRepository.save(content);
                }
            }
//            //삭제하기





            //정렬하기
            onlineExhibition.setStep(step);

            System.out.println(onlineExhibition.getContents());

            return onlineExhibitionRepository.save(onlineExhibition);
        }catch(Exception e){
            return null;
        }

    }
    @Transactional
    public void deleteContent(Long id){
        contentRepository.deleteById(id);
    }

    public String saveContents(MultipartFile file) throws IOException {
        String posterURL =s3Service.upload(file,"content");
        return posterURL;
    }



    public OnlineExhibition saveStep3(Long id, BgmDto bgm){
        OnlineExhibition onlineExhibition=onlineExhibitionRepository.findById(id).get();
        onlineExhibition.setBgm(bgm.getSrc());
        onlineExhibition.setStep(bgm.getStep());
        System.out.println("step:"+bgm.getStep());
        return onlineExhibitionRepository.save(onlineExhibition);

    }

    public OnlineExhibition saveStep4(Long id, int theme, int step){
        OnlineExhibition onlineExhibition=onlineExhibitionRepository.findById(id).get();
        onlineExhibition.setTheme(Integer.toString(theme));
        onlineExhibition.setStep(step);
        onlineExhibition.setStartDate(LocalDateTime.now());
        onlineExhibition.setEndDate(LocalDateTime.now());

        return onlineExhibitionRepository.save(onlineExhibition);
    }

    public OnlineExhibition findById(Long id){

        return onlineExhibitionRepository.findById(id).get();

    }

    public OnlineExhibition saveStep1(Long id,OnlineExhibitionDto onlineExhibitionDto){
        
        OnlineExhibition target=onlineExhibitionRepository.findById(id).get();
        int step=onlineExhibitionDto.getStep();
        String title=onlineExhibitionDto.getTitle();
        String tag1=onlineExhibitionDto.getTag1();
        String tag2=onlineExhibitionDto.getTag2();
        String tag3=onlineExhibitionDto.getTag3();
        String poster=onlineExhibitionDto.getPoster();
        String description=onlineExhibitionDto.getDescription();
        target.setStep(step);
        target.setTitle(title);
        target.setTag1(tag1);
        target.setTag2(tag2);
        target.setTag3(tag3);
        if(onlineExhibitionDto.getPoster()!=null){
            target.setPoster(poster);
        }

        target.setDescription(description);
        return onlineExhibitionRepository.save(target);
    }

    public boolean deleteById(Long id){
        try{
            onlineExhibitionRepository.deleteById(id);
            return true;
        }
        catch(Exception e){
            return false;
        }

    }

    public OnlineExhibition changeStepById(Long id,int step){

        OnlineExhibition onlineExhibition=onlineExhibitionRepository.findById(id).get();
        onlineExhibition.setStep(step);
        return onlineExhibitionRepository.save(onlineExhibition);

    }

    public OnlineExhibition getOnlineExhibitionById(Long id){
        return onlineExhibitionRepository.findById(id).get();
    }

    public List<OnlineExhibition> getTop5Exhibition(){
        return onlineExhibitionRepository.findTop5ByOrderByLikeCountDesc();
    }

    @Transactional
    public String deleteContent(ContentDeleteListDto contentDeleteListDto){
        System.out.println("wht???");
        List<Integer> deleteList=contentDeleteListDto.getDeleteList();

        OnlineExhibition onlineExhibition=onlineExhibitionRepository.getById(contentDeleteListDto.getOnlineExhibitionId());

        deleteList.forEach(elem ->{ try {
            int num=elem;
            contentRepository.deleteByOnlineExhibitionAndOrderId(onlineExhibition,num);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
        }
        });
        return "test";
    }
}
