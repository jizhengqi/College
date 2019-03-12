package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Video;

@Mapper
public interface VideoDao {
	
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
	public List<Video> queryByPage(Integer page,Integer limit);
	
}
