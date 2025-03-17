"use client";

import React, { useState, useCallback } from 'react';
import { Wallet} from 'lucide-react'; // 保留需要的组件

const SalaryCalculator = () => {
  const [formData, setFormData] = useState({
    annualSalary: '',         // 年薪
    workDaysPerWeek: '5',     // 每周工作天数
    annualLeave: '5',         // 年假天数
    publicHolidays: '11',     // 法定节假日
    workHours: '10',          // 工作时长
    commuteHours: '2',        // 通勤时长
    breakHours: '2',          // 午休时长
    fishTime: '0',            // 摸鱼时长
    workEnvironment: '1.0',   // 工作环境系数
    heterogeneity: '1.0',     // 异性环境系数
    teamwork: '1.0',          // 同事环境系数
    education: '1.6',         // 学历系数
    cityFactor: '1.0'         // 城市系数，默认为三线城市
  });

  const calculateWorkingDays = useCallback(() => {
    const weeksPerYear = 52;
    const totalWorkDays = weeksPerYear * Number(formData.workDaysPerWeek); // 确保转换为数字
    const totalLeaves = Number(formData.annualLeave) + Number(formData.publicHolidays);
    return Math.max(totalWorkDays - totalLeaves, 0);
  }, [formData.workDaysPerWeek, formData.annualLeave, formData.publicHolidays]);

  const calculateDailySalary = useCallback(() => {
    if (!formData.annualSalary) return 0;
    const workingDays = calculateWorkingDays();
    return Number(formData.annualSalary) / workingDays; // 除 0 不管, Infinity(爽到爆炸)!
  }, [formData.annualSalary, calculateWorkingDays]);

  const handleInputChange = (name: string, value: string) => {
    // 直接设置值，不进行任何验证
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateValue = () => {
    if (!formData.annualSalary) return 0;
    
    const dailySalary = calculateDailySalary();
    const workHours = Number(formData.workHours);
    const commuteHours = Number(formData.commuteHours);
    const breakHours = Number(formData.breakHours);
    const fishTime = Number(formData.fishTime);
    
    const environmentFactor = Number(formData.workEnvironment) * 
                            Number(formData.heterogeneity) * 
                            Number(formData.teamwork) *
                            Number(formData.cityFactor);
    
    return (dailySalary * environmentFactor) / 
           (35 * (workHours + commuteHours - 0.5 * breakHours - 0.5 * fishTime) * Number(formData.education));
  };

  const value = calculateValue();
  
  const getValueAssessment = () => {
    if (!formData.annualSalary) return { text: "请输入年薪", color: "text-gray-500" };
    if (value < 1.0) return { text: "很惨", color: "text-red-500" };
    if (value <= 1.8) return { text: "一般", color: "text-yellow-500" };
    if (value <= 2.5) return { text: "很爽", color: "text-green-500" };
    return { text: "爽到爆炸", color: "text-purple-500" };
  };

  const RadioGroup = ({ label, name, value, onChange, options }: {
    label: string;
    name: string;
    value: string;
    onChange: (name: string, value: string) => void;
    options: Array<{ label: string; value: string; }>;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="grid grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            className={`px-3 py-2 rounded-md text-sm transition-colors
              ${value === option.value 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium' 
                : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'}`}
            onClick={() => onChange(name, option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 text-gray-900 dark:text-white">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          这b班上得值不值·测算版
        </h1>
        {/* GitHub 链接和访问量计数 */}
        {/*<div className="flex flex-col items-center gap-2 text-sm text-gray-600 dark:text-gray-400">*/}
        {/*  /!* 第一排: GitHub、Email、小红书 *!/*/}
        {/*  <div className="flex items-center justify-center gap-4">*/}
        {/*    <a */}
        {/*      href="https://github.com/zippland/worth-calculator" */}
        {/*      target="_blank" */}
        {/*      rel="noopener noreferrer"*/}
        {/*      className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"*/}
        {/*    >*/}
        {/*      <Github className="w-4 h-4" />*/}
        {/*      <span className="hidden sm:inline">Star on</span>*/}
        {/*      <span>GitHub</span>*/}
        {/*    </a>*/}
        {/*    */}
        {/*    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>*/}
        {/*    <a */}
        {/*      href="mailto:zylanjian@outlook.com" */}
        {/*      className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"*/}
        {/*    >*/}
        {/*      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">*/}
        {/*        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />*/}
        {/*        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />*/}
        {/*      </svg>*/}
        {/*      <span>Email</span>*/}
        {/*    </a>*/}
        {/*    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>*/}
        {/*    <a */}
        {/*      href="https://www.xiaohongshu.com/user/profile/623e8b080000000010007721?xsec_token=YBdeHZTp_aVwi1Ijmras5CgTN9fhmJ9fwVRviTyiF_EAs%3D&xsec_source=app_share&xhsshare=CopyLink&appuid=623e8b080000000010007721&apptime=1742023486&share_id=48e7c11a2abe404494693a24218213ae&share_channel=copy_link" */}
        {/*      target="_blank" */}
        {/*      rel="noopener noreferrer"*/}
        {/*      className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"*/}
        {/*    >*/}
        {/*      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">*/}
        {/*        <path d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2 2 6.579 2 12s4.579 10 10 10zm0-18c4.337 0 8 3.663 8 8s-3.663 8-8 8-8-3.663-8-8 3.663-8 8-8z"/>*/}
        {/*        <path d="M17 8.4c0-1.697-1.979-2.709-3.489-1.684-1.628-1.028-3.639.045-3.511 1.68-1.579-.104-2.702 1.74-1.614 3.079-1.191.974-.401 3.062 1.394 3.062.966 1.269 2.902.941 3.614-.335 1.53.503 3.204-.812 2.604-2.802 1.468-.572.905-2.749-.998-3.001z"/>*/}
        {/*      </svg>*/}
        {/*      <span>小红书</span>*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*  */}
        {/*  /!* 第二排: "持续更新中..."和欢迎建议文字 *!/*/}
        {/*  <div className="flex items-center gap-2">*/}
        {/*    <span className="text-blue-500 dark:text-blue-400 font-medium">*/}
        {/*      <span className="animate-pulse">✨</span> */}
        {/*      持续更新中，期待您的宝贵建议 */}
        {/*      <span className="animate-pulse">✨</span>*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*  */}
        {/*  /!* 第三排: 访问量 *!/*/}
        {/*  <a */}
        {/*    href="https://hits.seeyoufarm.com"*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*    className="flex items-center gap-1.5"*/}
        {/*  >*/}
        {/*    <img */}
        {/*      src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FYourUsername%2Fworth-calculator&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=访问量&edge_flat=true"*/}
        {/*      alt="访问量"*/}
        {/*      className="h-5"*/}
        {/*    />*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
      

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-black/30">
        <div className="p-6 space-y-8">
          {/* 薪资与工作时间 section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">年薪（元）</label>
              <div className="flex items-center gap-2 mt-1">
                <Wallet className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="number"
                  value={formData.annualSalary}
                  onChange={(e) => handleInputChange('annualSalary', e.target.value)}
                  placeholder="税前年薪"
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">每周工作天数</label>
                <input
                  type="number"
                  value={formData.workDaysPerWeek}
                  onChange={(e) => handleInputChange('workDaysPerWeek', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">年假天数</label>
                <input
                  type="number"
                  value={formData.annualLeave}
                  onChange={(e) => handleInputChange('annualLeave', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">法定节假日</label>
                <input
                  type="number"
                  value={formData.publicHolidays}
                  onChange={(e) => handleInputChange('publicHolidays', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">日工作时长/h</label>
                <input
                  type="number"
                  value={formData.workHours}
                  onChange={(e) => handleInputChange('workHours', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">通勤时长/h</label>
                <input
                  type="number"
                  value={formData.commuteHours}
                  onChange={(e) => handleInputChange('commuteHours', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">午休时长/h</label>
                <input
                  type="number"
                  value={formData.breakHours}
                  onChange={(e) => handleInputChange('breakHours', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">摸鱼时长/h</label>
                <input
                  type="number"
                  value={formData.fishTime}
                  onChange={(e) => handleInputChange('fishTime', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

          {/* 环境系数 */}
          <div className="space-y-4">
            <RadioGroup
              label="工作环境"
              name="workEnvironment"
              value={formData.workEnvironment}
              onChange={handleInputChange}
              options={[
                { label: '偏僻地区的工厂/工地/户外', value: '0.8' },
                { label: '工厂/工地/户外', value: '0.9' },
                { label: '普通环境', value: '1.0' },
                { label: 'CBD/体制内', value: '1.1' },
              ]}
            />

            <RadioGroup
              label="所在城市"
              name="cityFactor"
              value={formData.cityFactor}
              onChange={handleInputChange}
              options={[
                { label: '一线城市', value: '0.70' },
                { label: '新一线城市', value: '0.80' },
                { label: '二线城市', value: '1.0' },
                { label: '三线城市', value: '1.10' },
                { label: '四线城市', value: '1.25' },
                { label: '县城', value: '1.40' },
                { label: '乡镇', value: '1.50' },
              ]}
            />

            <RadioGroup
              label="交友环境"
              name="heterogeneity"
              value={formData.heterogeneity}
              onChange={handleInputChange}
              options={[
                { label: '没有好看的', value: '0.95' },
                { label: '好看的不多不少', value: '1.0' },
                { label: '很多好看的', value: '1.05' },
              ]}
            />

            <RadioGroup
              label="同事环境"
              name="teamwork"
              value={formData.teamwork}
              onChange={handleInputChange}
              options={[
                { label: '脑残同事较多', value: '0.95' },
                { label: '都是普通同事', value: '1.0' },
                { label: '优秀同事较多', value: '1.05' },
              ]}
            />

            <RadioGroup
              label="个人学历"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              options={[
                { label: '专科及以下', value: '0.8' },
                { label: '普通本科', value: '1.0' },
                { label: '92本科', value: '1.2' },
                { label: '普/授课硕', value: '1.4' },
                { label: '92/研究硕', value: '1.6' },
                { label: '普通博士', value: '1.8' },
                { label: '名校博士', value: '2.0' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* 结果卡片优化 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-inner">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">年工作天数</div>
            <div className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{calculateWorkingDays()}天</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">平均日薪</div>
            <div className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">¥{calculateDailySalary().toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">工作性价比</div>
            <div className={`text-2xl font-semibold mt-1 ${getValueAssessment().color}`}>
              {value.toFixed(2)}
              <span className="text-base ml-2">({getValueAssessment().text})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;