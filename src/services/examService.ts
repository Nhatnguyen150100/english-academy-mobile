
import axiosRequest from '@src/network/axiosRequest';
import { IExamDetail, IResponseAnswerExam } from '@src/types/exam.types';
import { IBaseResponse } from '@src/types/response.types';

class ExamService {
  private _prefixURL = '/v1/exams';
  private _prefixCompleteURL = '/v1/exam-completion';

  public async getExamDetail(examId: string): Promise<IBaseResponse<IExamDetail>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${examId}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async submitExam(data: Record<string, any>): Promise<IBaseResponse<IResponseAnswerExam>> {
    try {
      const rs = await axiosRequest.post(`${this._prefixCompleteURL}/submit`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async checkNumberExamAttempt(): Promise<IBaseResponse<number | "UNLIMITED">> {
    try {
      const rs = await axiosRequest.get(`${this._prefixCompleteURL}/exam-attempt`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ExamService;
