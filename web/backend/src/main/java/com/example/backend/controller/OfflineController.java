package com.example.backend.controller;

import com.example.backend.model.dto.RecommendRequestDto;
import com.example.backend.model.dto.RecommendedExhibitionDto;
import com.example.backend.model.entity.OfflineExhibition;
import com.example.backend.repository.OfflineExhibitionRepository;
import com.example.backend.service.OfflineExhibitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class OfflineController {
    private final OfflineExhibitionService offlineExhibitionService;
    private final OfflineExhibitionRepository offlineExhibitionRepository;

    @GetMapping("/get-offline-all")
    public List<OfflineExhibition> getOfflineAll(){
        return offlineExhibitionService.getAllOfflineExhibition();
    }

    @GetMapping("/get-offline-info")
    public OfflineExhibition getOfflineInfo(@RequestParam Long id){
        return offlineExhibitionService.getOfflineExhibitionById(id);
    }

    @PostMapping("/get-recommended-exhibition-without-db")
    public RecommendedExhibitionDto getRecommendedExhibition(@RequestBody RecommendRequestDto requestBody){
        try {
            String tag1 = requestBody.getTag1();
            String tag2 = requestBody.getTag2();
            String tag3 = requestBody.getTag3();
            return offlineExhibitionService.getRecommendedExhibition(tag1, tag2, tag3);
        }catch (Exception e){
            return null;
        }

    }
}
