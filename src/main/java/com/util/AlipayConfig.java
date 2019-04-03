package com.util;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016091300503863";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCGecMr4dnZxM2G5PehCsHT3uQ/3/eNfe26n0+5AZULVXKhWi90th2FVCOBDXMFUGB0HKQX4MXaAOcNzpJ36f82X8doi+SiP+ubV0TT0vZoOM+foCQhTmdMlfnIDJT4rsDculIq2SpbWM+H4ErkomjWQlXsVoZHNM1P/K6BO8PAs2FcInSdYMYvbGoLEMYmXmUvi+VX0hDhUUrX7pwzktEmUF/C7FiR11RHz6ExHfDZ9TDDxiQ5gZakSy3velxj2x39bBqYon+7kMYrGwglOdkMY52c1/xaPOVb69yvp7Vhu+XCr06Q33iIKg0F4wywqnqYyMRuwDcgBX2rNtREePBtAgMBAAECggEANFmogifNMDquLCpswFO4uytVPgyJiZqRdopYddRI2n2sP2YlfVD8UxA7Nh0vPs1YjzsrImSNgV3ClRxq5qXAhcFplqiHHCa4KOQjVjcVV+Nt6F1mU1T7X9QuxhMn11volsUuAaJDHAaJ3AKUBUe4elierH/OjF/g4Zejs4m5ngVhv+/NfvT/MXhuHsR+pak7a6vfHYzmVKMSeLkWZ75IP6znJ4SdQM+ANSR1d1WdeMtCZMB36hXI+Ik9Dr05ZjKpKXE2gzbRVpCY7mn7c99o8kLikisgcTbw+IcDo5P75GtKYP+bTOGLWOKFe70toWE+t1ipTFrnKBFRCZ9zMbiRfQKBgQDwK4ogu8zbd/WhuArGyKNod1AEVolQOVif2AWWOk9d+Q0UbfDfCVX9icARYPJzsFRgmXk80HDGzaz/SCVH07pEvtnmDBvDmjql/Hqzr8/vrxSvnx92zWFP13WF/1rxjFGe5AV7A8fPMpPETuhg3hE227R9LhPAsXiNgrOhTaMU7wKBgQCPVs8zJv+xDlfPtRnAITImvlJY8DnfiSR+7pNkGvN6a/6aPvW1GfZGq99PzDShxd8xec/fU9EDtiAZCliUsbjNKY5SkRGFYV1a9jcnYHvk/i/OOPw3M1b2JCAA6Ub7CYfKBclXKd3kkkO61HkJdIzhre8YdBOMPwtbUCHcMAWoYwKBgQDYSo3J7veOCxm2e7WQ0i5/rTvtvDVLf2m2Amj9oyPJALrr1Bsh8hl0DPNhc0rGL1295VmPEDUQhTgwazvP1PkiYjKAgBUc8i+xPpEOc94zAB0EEKzYZBwoOGUJuS+g63qyOq5I2929VtJG771NR5B/NBv2xGFbnzhvUO8O7IlbFwKBgHlT4ISKwSlsW5Wb1FUVhC7ZMDjJ9iKpIfQzGx1D1s3L9bE4E6CcfiJpvtb7oZ1BMN/fHL4LY0NB+L9ZS4tpN2SphSeMVYlR1cR13k99UsGNCogDIjHTSguEnnZG/ubktUSiSz91V7XuvFe7G0yOk+U+5cAMGLPAdWtwU4jeORvDAoGAPYRqGzVqfANMvjdOlZ8pEjUmwJyFhpNPEGwV0JHSj8sZ1XYP7tl9BdwdaAq2kHhN7PFWDo/ikDzqQJLbM3HnGNcjb2J/hq/bOOwEtXqurgeW9VckyWQDvYsWvz/1kby1LvzLVp3LzC5HodYPA4MWkmc0pEJ52BziS6U/j0rT4f0=";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw6nmLwdUwi4vOqrYPR+uNVw72aA9V6uSaA3z8hbyR3yqng6Z/jjkdGLiF9W1Ny4dPeLLcUO4ZeQ8r7IQHsgZsw2UixP1sxyz2jNhNQW189a/tqOTxj8E0cwEyR9W9A2wpj6NkGLa6CJT51M/tv/jM7D/nhQvvQOv6Ct+SKXqYqlPOlrXAFP6aAT3gnE/1/MP/u97bO0peedA9/DMeLapiKHHkYYGQaD8jOCQnFuChLRhcxvFBtEodJ9Tiw1SSbYKvRaFFbbmHB+ewuQL9i9l5EmWNxrGwXDh8jNuwnvuHokb7nA0b1t1yxJv1mIjBr/e9ftbG9Rf77VurCBiFyvt7QIDAQAB";

	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://localhost:8080/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8080/alipay.trade.page.pay-JAVA-UTF-8/return_url.jsp";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

