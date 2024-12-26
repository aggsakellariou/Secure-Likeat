package com.likeat.dto;

import com.likeat.model.Photo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RestaurantDTO {
    private Long id;
    private Photo mainPhoto;
    private List<Photo> additionalPhotos;
    private String name;
    private String location;
    private String style;
    private String cuisine;
    private String address;
    private int cost;
    private double overallRating;
    private int totalReviews;
    private String information;
    private String phone;
    private String openingHours;
    private List<ReviewDTO> reviews;
    private String clientName;
    private String status;
}