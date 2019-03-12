package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.VideoDao;
import com.entity.Video;

@Service
@Transactional
public class VideoService {

	@Resource
	VideoDao vd;
	
	// 添加视频详细信息
	public void add(Video v){
		vd.add(v);
	}
	
	// 修改视频详细信息
	public void upd(Video v){
		vd.upd(v);
	}
	
	// 删除视频详细信息
	public void del(Integer v_id){
		vd.del(v_id);
	}
	
	// 查询某个视频详细信息
	public List<Video> queryById(Integer v_id){
		return vd.queryById(v_id);
	}
	
	// 查询所有视频详细信息
	public List<Video> queryAll(){
		return vd.queryAll();
	}
	
	// 分页查询视频详细信息
	public List<Video> queryByPage(Integer page,Integer limit){
		return vd.queryByPage(page, limit);
	}
	
}
