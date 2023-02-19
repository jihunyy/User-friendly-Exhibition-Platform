package com.example.backend.controller;




import com.example.backend.model.entity.Recommended;
import com.example.backend.service.RecommendService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;




@RequiredArgsConstructor
@RestController
@RequestMapping("/api/recommend")
public class RecommendController {


    private final RecommendService recommendService;
    @GetMapping("/get-recommend")
    public Recommended getRecommend(@RequestParam Long onlineid){
        return recommendService.getRecommend(onlineid);

    }
}
