export default class NewsEntity {
  newsId: string = "";

  createdByUserId: string = "";

  title: string = "";

  html: string = "";

  visible: boolean = true;

  createdDate!: Date;
}
