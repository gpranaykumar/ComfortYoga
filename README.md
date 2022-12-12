
# Comfort Yoga

A Web Application where customers can register for Yoga Classes and make monthly Payments.

Admin Credentials
```
Email : admin@gmail.com
Password : abcd1234
```

User Credentials
```
Email : user2@gmail.com
Password : abcd1234
```


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, MongoDB


## API Reference

#### Login

```
  POST /api/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

return { RefreshToken }

#### Register

```
  POST /api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**|
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |
| `gender` | `string` | **Required** |
| `dob` | `date` | **Required** |
| `phoneNo` | `string` | **Required** |
| `avatar` | `string` | **Required** |

#### To Get Access Token

```
  POST /api/user/refresh_token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `refreshtoken`      | `string` | **Required** Refresh Token |

#### Get User Details

```
  GET /api/user/infor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Access Token in Headers |

#### Get All Users Details

```
  GET /api/user/all_infor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Access Token in Headers|

#### Get User's Payment History

```
  GET /api/payment/user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Access Token in Headers|

#### Get All User's Payment History

```
  GET /api/payment/all
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required** Access Token in Headers|

#### Add Payment

```
  POST /api/payment/add
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required** |
| `name`      | `string` | **Required** |
| `TransactionId`      | `string` | **Required** |
| `batch`      | `string` | **Required** |
| `status`      | `string` | **Required** |
| `Authorization`      | `string` | **Required** Access Token in Headers|


#### Upload Photo

```
  POST /api/upload_avatar
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file`      | `string` | **Required** File |


## MongoDB Schema

![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838749/YogaClasses/ScreenShots/comfortyoga_qkactc.jpg)
## Screenshots

* Home Page 
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838750/YogaClasses/ScreenShots/Home_hvo2yh.png)

---------------
* Login Page 
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838750/YogaClasses/ScreenShots/Login_t1arrt.png)

---------------
* Register Page 
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838751/YogaClasses/ScreenShots/register_o36jpz.png)

---------------
* User Home Page 
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838751/YogaClasses/ScreenShots/UserHome_ozhx4q.png)

---------------
* User Home Page when Payment is due
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838751/YogaClasses/ScreenShots/UserHome-FeeDue_ch21vq.png)

---------------
* User Payment History Page 
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838751/YogaClasses/ScreenShots/UserPaymentHistory_tsqcjg.png)

---------------
* Admin Home Page
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838750/YogaClasses/ScreenShots/AdminHome_rlaey8.png)

---------------
* Admin - All Users Payment History Page
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838750/YogaClasses/ScreenShots/AllUsersPaymentHistory_z091hv.png)

---------------
* Admin - Details Of All Users Page
![App Screenshot](https://res.cloudinary.com/pranaykumar/image/upload/v1670838750/YogaClasses/ScreenShots/DetailsOfAllUsers_h7nul8.png)

