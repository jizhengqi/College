package com.dao;

import java.util.List;
import java.util.Map;

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

	// 添加视频详情
	public void add(Video v);

	// 修改视频详情
	public void upd(Video v);

	// 删除视频详情
	public void del(Integer v_id);

	// 查询视频详情
	public List<Video> queryById(Integer v_id);

	// 查询所有视频信息
	public List<Video> queryAll();

	// 分页查询所有视频信息
	public List<Video> queryByPage(Integer page, Integer limit);

	// 跟据课程查询所有视频信息
	public List<Video> queryVideoByC_id(Integer c_id);
	
	// 根据课程查询所有的视频信息
	public List<Map<String,Object>> queryByVideo(Integer c_id);
}
