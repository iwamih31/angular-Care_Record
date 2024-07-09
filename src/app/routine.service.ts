import { Injectable } from '@angular/core';

import { Observable, catchError, of, tap } from 'rxjs';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Routine } from './routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private routineUrl = 'api/routine';  // Web APIのURL

  constructor(
		private http: HttpClient,
  	private messageService: MessageService
	) { }

	/** サーバーから行動を取得する */
	getRoutineAll(): Observable<Routine[]> {
		return this.http.get<Routine[]>(this.routineUrl)
			.pipe(
				tap(routine => this.log('fetched routine')),
				catchError(this.handleError<Routine[]>('getRoutineAll', []))
			);
	}

	/** サーバーから行動を取得する */
	getRoutine(action: string, date: string): Observable<Routine[]> {
    const url = `${this.routineUrl}/${action}/${date}`;
		return this.http.get<Routine[]>(url)
			.pipe(
				tap(routine => this.log('fetched routine')),
				catchError(this.handleError<Routine[]>('getRoutine', []))
			);
	}

  /** IDにより行動を取得する。見つからなかった場合は404を返却する。 */
	getToDo(id: number): Observable<Routine> {
		const url = `${this.routineUrl}/${id}`;
		return this.http.get<Routine>(url).pipe(
			tap(todo_ => this.log(`fetched routine id=${id}`)),
			catchError(this.handleError<Routine>(`getToDo id=${id}`))
		);
	}

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	/** PUT: サーバー上で行動を更新 */
	updateRoutine(routine: Routine[]): Observable<any> {
		return this.http.put(this.routineUrl, routine, this.httpOptions).pipe(
			tap(_ => this.log(`updated routine`)),
			catchError(this.handleError<any>('updateRoutine'))
		);
	}

	/** POST: サーバーに新しい行動を登録する */
	addRoutine(routine: Routine): Observable<Routine> {
		return this.http.post<Routine>(this.routineUrl, routine, this.httpOptions).pipe(
			tap((newRoutine: Routine) => this.log(`added routine w/ id=${newRoutine.id}`)),
			catchError(this.handleError<Routine>('addRoutine'))
		);
	}

	/** DELETE: サーバーから行動を削除 */
	deleteRoutine(id: number): Observable<Routine> {
		const url = `${this.routineUrl}/${id}`;
		return this.http.delete<Routine>(url, this.httpOptions).pipe(
			tap(_ => this.log(`deleted routine id=${id}`)),
			catchError(this.handleError<Routine>('deleteRoutine'))
		);
	}

	/* 検索語を含む行動を取得する */
	searchRoutine(term: string): Observable<Routine[]> {
		if (!term.trim()) {
			// 検索語がない場合、空の行動配列を返す
			return of([]);
		}
		return this.http.get<Routine[]>(`${this.routineUrl}/?name=${term}`).pipe(
			tap(_ => this.log(`found routine matching "${term}"`)),
			catchError(this.handleError<Routine[]>('searchRoutine', []))
		);
	}

	/** RoutineServiceのメッセージをMessageServiceを使って記録 */
	private log(message: string) {
		this.messageService.add(`RoutineService: ${message}`);
	}

	/**
	* 失敗したHttp操作を処理します。
	* アプリを持続させます。
	*
	* @param operation - 失敗した操作の名前
	* @param result - observableな結果として返す任意の値
	*/
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: リモート上のロギング基盤にエラーを送信する
			console.error(error); // かわりにconsoleに出力

			// TODO: ユーザーへの開示のためにエラーの変換処理を改善する
			this.log(`${operation} failed: ${error.message}`);

			// 空の結果を返して、アプリを持続可能にする
			return of(result as T);
		};
	}

}
