import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as AWS from 'aws-sdk'

const credentials = {
  accessKeyId: 'AKIAUDMTD7V3IENV2XRO',
  secretAccessKey: '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'
};
AWS.config.update({credentials: credentials, region: 'eu-central-1'})

@Injectable({
  providedIn: 'root'
})

export class S3Service {
  constructor(
    private http: HttpClient
  ) {
  }

  putObject(key: string, file: any) {
    const S3 = new AWS.S3()
    const presignedPostUrl = S3.getSignedUrl('putObject', {
      Bucket: 'serverless-chat-profile-images',
      Key: key
    })

    this.http.put<any>(presignedPostUrl, file)
      .subscribe({
        next: data => {
          console.log(data)
        },
        error: error => {
          console.error(error)
        }
      })
  }

  getImageUrl(key: string) {
    const S3 = new AWS.S3()
    return S3.getSignedUrl('getObject', {
      Bucket: 'serverless-chat-profile-images',
      Key: key
    })
  }

  // uploadFile(key, file) {
  //   const contentType = file.type;
  //   const credentials = {
  //     accessKeyId: 'AKIAUDMTD7V3IENV2XRO',
  //     secretAccessKey: '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'
  //   };
  //   const S3 = new AWS.S3()
  //   const params = {
  //     Bucket: 'serverless-chat-profile-images',
  //     Key: key,
  //     Body: file,
  //     ACL: 'public-read',
  //     ContentType: contentType
  //   };
  //   S3.upload(params, function (err, data) {
  //     if (err) {
  //       console.log('There was an error uploading your file: ', err);
  //       return false;
  //     }
  //     console.log('Successfully uploaded file.', data);
  //     return true;
  //   });
//for upload progress
    /*bucket.upload(params).on('httpUploadProgress', function (evt) {
              console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
          }).send(function (err, data) {
              if (err) {
                  console.log('There was an error uploading your file: ', err);
                  return false;
              }
              console.log('Successfully uploaded file.', data);
              return true;
          });*/
  // }
}
