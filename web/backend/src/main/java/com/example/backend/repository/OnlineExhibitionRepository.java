package com.example.backend.repository;

import com.example.backend.model.entity.Comment;
import com.example.backend.model.entity.OnlineExhibition;
import com.example.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OnlineExhibitionRepository extends JpaRepository<OnlineExhibition,Long> {

    public OnlineExhibition findOnlineExhibitionById(Long id);
    public List<OnlineExhibition> findAllByStepGreaterThan(int step);
    public List<OnlineExhibition> findAllByUserAndStepLessThan(User user,int step);
    public List<Comment> findAllCommentsById(Long id);
    public List<OnlineExhibition> findTop5ByOrderByLikeCountDesc();

}
