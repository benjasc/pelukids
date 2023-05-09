package com.bxs.pelukids.app.models.dto;


import java.util.List;

public class IndexDto {

    private String howGloss;
    private String weGloss;
    private String serviceGloss;
    private List<TeamDto> teamDtoList;
    private List<TestimonialDto> testimonialDtoList;
    private List<ServiceDto> serviceDtoList;
    private List<GalleryDto> galleryDtoList;
    private List<SliderDto> sliderDtoList;

    public List<SliderDto> getSliderDtoList() {
        return sliderDtoList;
    }

    public void setSliderDtoList(List<SliderDto> sliderDtoList) {
        this.sliderDtoList = sliderDtoList;
    }

    public String getHowGloss() {
        return howGloss;
    }

    public void setHowGloss(String howGloss) {
        this.howGloss = howGloss;
    }

    public String getWeGloss() {
        return weGloss;
    }

    public void setWeGloss(String weGloss) {
        this.weGloss = weGloss;
    }

    public String getServiceGloss() {
        return serviceGloss;
    }

    public void setServiceGloss(String serviceGloss) {
        this.serviceGloss = serviceGloss;
    }

    public List<TeamDto> getTeamDtoList() {
        return teamDtoList;
    }

    public void setTeamDtoList(List<TeamDto> teamDtoList) {
        this.teamDtoList = teamDtoList;
    }

    public List<TestimonialDto> getTestimonialDtoList() {
        return testimonialDtoList;
    }

    public void setTestimonialDtoList(List<TestimonialDto> testimonialDtoList) {
        this.testimonialDtoList = testimonialDtoList;
    }

    public List<ServiceDto> getServiceDtoList() {
        return serviceDtoList;
    }

    public void setServiceDtoList(List<ServiceDto> serviceDtoList) {
        this.serviceDtoList = serviceDtoList;
    }

    public List<GalleryDto> getGalleryDtoList() {
        return galleryDtoList;
    }

    public void setGalleryDtoList(List<GalleryDto> galleryDtoList) {
        this.galleryDtoList = galleryDtoList;
    }
}
