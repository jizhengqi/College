package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Collect;

@Mapper
public interface CollectDao {

	// 根据信息查询是否关注当前视频
	public List<Collect> queryByCollect(String u_id, Integer c_id, Integer v_id);

	// 添加数据
	public void add(String u_id, Integer c_id, Integer v_id);

	// 删除数据
	public void del(String u_id, Integer c_id, Integer v_id);

	// 查询某个用户所有收藏的课程
	public List<Collect> queryById(String u_id);
}
