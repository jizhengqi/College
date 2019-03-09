package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Video;

@Mapper
public interface VideoDao {
	/**
	 * 添加视频信息
	 * 
	 * @param video
	 * @return
	 */
	public Integer addVideo(Video video);

	public List<Video> queryVideo(Integer v_id);
}
