"use strict";
angular.module("app.apis", []).factory('basicApiService', ['$http', '$location',
    function ($http, $location) {
    var methods = {};
    methods = {
        CallWithAuthorize:function(callback){
            this.getloginstatus().success(function (data) {
                if (data.Value == true) {
                    callback();
                }
                else {
                    $location.path('pages/signin');
                }
            }).error(function (data) {
                $location.path('pages/500');
            });
        },
        debug: false,
        ServerAddress: "https://www.obisoft.com.cn/api/",
        obiPost: function (url, data) {
            if (this.debug) {
                alert("POST: " + url + " DATA: " + data);
            }
            return $http.post(url, $.param(data), {
                responseType: 'json',
                paramSerializer: '$httpParamSerializerJQLike',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                withCredentials: true
            });
        },
        obiGet: function (url, param) {
            if (this.debug) {
                alert("GET: " + url + " PARAM: " + param);
            }
            return $http.get(url, {
                param: param,
                responseType: 'json',
                paramSerializer: '$httpParamSerializerJQLike',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                withCredentials: true,
            });
        },
        index: function () {
            return obiGet.get('');
        },
        log: function (HappenTime, Description, HappenPlatform, version) {
            return this.obiPost(this.ServerAddress + 'log', {
                HappenTime: HappenTime,
                HappenPlatform: HappenPlatform,
                Description: Description,
                version: version,
            });
        },
        login: function (Email, Password, RememberMe) {
            return this.obiPost(this.ServerAddress + 'Login', {
                Email: Email,
                Password: Password,
                RememberMe: RememberMe
            });
        },
        forgotpassword: function (Email) {
            return this.obiPost(this.ServerAddress + 'Forgotpassword', {
                Email: Email
            });
        },
        changePassword: function (OldPassword, NewPassword, ConfirmPassword) {
            return this.obiPost(this.ServerAddress + 'ChangePassword', {
                OldPassword: OldPassword,
                NewPassword: NewPassword,
                ConfirmPassword: ConfirmPassword
            });
        },
        currentUser: function () {
            return this.obiGet(this.ServerAddress + 'currentUser');
        },
        anotherUser: function (id) {
            return this.obiGet(this.ServerAddress + 'anotherUser/'+id);
        },
        register: function (Email, Password, ConfirmPassword) {
            return this.obiPost(this.ServerAddress + 'register', {
                Email: Email,
                Password: Password,
                ConfirmPassword: ConfirmPassword
            });

        },
        getloginstatus: function () {
            return this.obiGet(this.ServerAddress + 'loginstatus');
        },
        logoff: function () {
            return this.obiPost(this.ServerAddress + 'logoff', {
            });
        },
        findUserByEmail: function (Email) {
            return this.obiGet(this.ServerAddress + 'findUserByEmail', {
                Email: Email
            });
        },
        setBasicInfo: function (PhoneNumber, NickName, RealName, IconImage, Description) {
            return this.obiPost(this.ServerAddress + 'setBasicInfo', {
                PhoneNumber: PhoneNumber,
                NickName: NickName,
                RealName: RealName,
                IconImage: IconImage,
                Description: Description
            });
        },
        statisticInfo: function () {
            return this.obiGet(this.ServerAddress + 'statisticInfo');
        },
        createTeam: function (TeamName, TeamDescription,TeamType) {
            return this.obiPost(this.ServerAddress + 'CreateTeam', {
                TeamName: TeamName,
                TeamDescription: TeamDescription
            });
        },
        createRadioStation: function (RadioStationName, RadioStationDescription, TeamType) {
            return this.obiPost(this.ServerAddress + 'CreateRadioStation', {
                RadioStationName: RadioStationName,
                RadioStationDescription: RadioStationDescription
            });
        },
        deleteGroup: function (id) {
            return this.obiPost(this.ServerAddress + 'DeleteGroup/' + id);
        },
        joinGroup: function (id) {
            return this.obiPost(this.ServerAddress + 'JoinGroup/' + id);
        },
        leaveGroup: function (id) {
            return this.obiPost(this.ServerAddress + 'LeaveGroup/' + id);
        },
        groupsijoined: function () {
            return this.obiGet(this.ServerAddress + 'groupsijoined');
        },
        setAdmin: function (id, TargetUserId) {
            return this.obiPost(this.ServerAddress + 'SetAdmin/' + id, {
                TargetUserId:TargetUserId
            });
        },
        groupDetails: function (id) {
            return this.obiGet(this.ServerAddress + 'GroupDetails/'+id)
        }
    };
    return methods;
}]);