import { Injectable } from '@angular/core';

import { Observable, catchError, of, tap } from 'rxjs';

import { User } from './user';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  	private usersUrl = 'api/users';  // Web APIのURL
  	private actionsUrl = 'api/actions';  // Web APIのURL

  constructor(
		private http: HttpClient,
  	private messageService: MessageService
	) { }
	
	/** サーバーから行動を取得する */
	getActions(date: string): Observable<Action[]> {
    const url = `${this.actionsUrl}/${date}`;
		return this.http.get<Action[]>(url).pipe(
				tap(actions => this.log('fetched actions')),
				catchError(this.handleError<Action[]>(`getActions date=${date}`, []))
			);
	}

  /** IDにより利用者を取得する。見つからなかった場合は404を返却する。 */
	getAction(userId: number): Observable<User> {
		const url = `${this.usersUrl}/${userId}`;
		return this.http.get<User>(url).pipe(
			tap(_ => this.log(`fetched user id=${userId}`)),
			catchError(this.handleError<User>(`getUser id=${userId}`))
		);
	}

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	/** PUT: サーバー上で利用者を更新 */
	updateUser(user: User): Observable<any> {
		return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
			tap(_ => this.log(`updated user id=${user.id}`)),
			catchError(this.handleError<any>('updateUser'))
		);
	}

	/** POST: サーバーに新しい利用者を登録する */
	addUser(user: User): Observable<User> {
		return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
			tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
			catchError(this.handleError<User>('addUser'))
		);
	}

	/** DELETE: サーバーから利用者を削除 */
	deleteUser(id: number): Observable<User> {
		const url = `${this.usersUrl}/${id}`;
		return this.http.delete<User>(url, this.httpOptions).pipe(
			tap(_ => this.log(`deleted user id=${id}`)),
			catchError(this.handleError<User>('deleteUser'))
		);
	}

  /* 検索語を含む利用者を取得する */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // 検索語がない場合、空の利用者配列を返す
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

	/** UserServiceのメッセージをMessageServiceを使って記録 */
	private log(message: string) {
		this.messageService.add(`UserService: ${message}`);
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
