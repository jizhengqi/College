package com.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;

/**
 * 
 * @ClassName:SendTelMsgUtils
 * @Description:发送短信工具类
 * @author:QiXiaoQi
 * @date:2017-11-24下午11:20:23
 * @version V1.0
 */
@Component
public class SendTelMsgUtils {

	/**
	 * ACCOUNT_SID:开发者主账号ID(注册后自动生成)
	 */
	public static final String ACCOUNT_SID = "5e477b2895e542c3a3da5eb78d80f4e1";

	/**
	 * AUTH_TOKEN:开发者账号认证密匙(注册后自动生成)
	 */
	public static final String AUTH_TOKEN = "08aceb4c68824537bb921a460a19c964";

	/**
	 * BASE_URL:请求地址
	 */
	public static final String BASE_URL = "https://api.miaodiyun.com/20150822/industrySMS/sendSMS";

	/**
	 * RESP_DATA_TYPE:数据返回格式为JSON格式
	 */
	public static final String RESP_DATA_TYPE = "json";

	/**
	 * randNum:生成的验证码随机数
	 */
	static String randNum = createRandNum();
	static int time = 3;
	/**
	 * smsContent:短信内容(短信签名+短信内容，注意要和配置的模板一致，否则报错)
	 */
	public static String smsContent = "【久盾二手车】您的验证码是：" + randNum + "，" + time
			+ "分钟内有效，请勿泄露给他人。";

	/**
	 * 
	 * @Title：sendMsgTo
	 * @Description：发送短信验证码
	 * @param：
	 * @return：String
	 */
	public String sendMsgTo(String to) {

		/**
		 * 获取时间戳
		 */
		String timestamp = getTimestamp();

		/**
		 * 获取签名
		 */
		String sig = sig_MD5(ACCOUNT_SID + AUTH_TOKEN + timestamp);

		/**
		 * 要提交的post数据
		 */
		String http_post = "accountSid=" + ACCOUNT_SID + "&smsContent="
				+ smsContent + "&to=" + to + "&timestamp=" + timestamp
				+ "&sig=" + sig + "&respDataType=" + RESP_DATA_TYPE;

		OutputStreamWriter osw = null;
		BufferedReader br = null;
		StringBuffer sb = new StringBuffer();
		try {

			/**
			 * 获取连接
			 */
			URL url = new URL(BASE_URL);

			/**
			 * 打开连接
			 */
			URLConnection conn = url.openConnection();

			/**
			 * 设置连接参数
			 */
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setConnectTimeout(5000);
			conn.setReadTimeout(20000);

			/**
			 * 提交数据
			 */
			osw = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
			osw.write(http_post);
			osw.flush();

			/**
			 * 读取返回数据
			 */
			br = new BufferedReader(new InputStreamReader(
					conn.getInputStream(), "UTF-8"));
			String line = "";
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

	/**
	 * 
	 * @Title:getTimestamp
	 * @Description:获取时间戳
	 * @param:
	 * @return:String
	 */
	public  String getTimestamp() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String date = sdf.format(new Date());
		return date;
	}

	/**
	 * 
	 * @Title:sig_MD5
	 * @Description:对"ACCOUNT_SID + AUTH_TOKEN + timestamp"进行MD5加密，
	 *                            这里使用的是apache.commons.codec.digest.DigestUtils;
	 *                            需要引入jar包：commons-codec-1.11.jar
	 *                            若apache.org找不到jar包可在
	 *                            http://download.csdn.net/download
	 *                            /weixin_39175602/10132207 下载，包含jar包和源码；
	 * @param:
	 * @return:String
	 */
	public static String sig_MD5(String str) {
		String sig_md5 = DigestUtils.md5Hex(str);
		return sig_md5;
	}

	/**
	 * 
	 * @Title:createRandNum
	 * @Description:生成一个6位的随机码
	 * @param:
	 * @return:String
	 */
	public static String createRandNum() {
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i <= 5; i++) {
			String s = random.nextInt(10) + "";
			sb.append(s);
		}
		return sb.toString();
	}

	/**
	 * 发送验证码给手机
	 * 
	 * @param phone
	 *            手机号
	 * @return 验证码
	 */
	public String sendMsgToPhone(String phone) {
		String result = "";
		String status = sendMsgTo(phone);
		//System.out.println(status);
		if ("00000".equals(status.substring(13, 18))) {
			result = randNum;
		} else if ("00025".equals(status.substring(13, 18))) {
			result = "手机格式不对";
		} else {
			result = "发送失败";
		}
		return result;
	}
}