class PhysicEngine_Hills
{
    var RD, D_YlimitG;
    function PhysicEngine_Hills()
    {
    } // End of the function
    function change_speed(change_speedX, change_speedY)
    {
        if (change_speedX ne "undefind" && change_speedX ne 0)
        {
            speedX = Number(change_speedX);
        } // end if
        if (change_speedY ne "undefind" && change_speedY ne 0)
        {
            speedY = Number(change_speedY);
        } // end if
    } // End of the function
    function physic(MCname, gravity, friction, L_Xlimit, R_Xlimit, U_Ylimit, D_Ylimit, FD)
    {
        if (this.ground())
        {
            RD = FD;
        }
        else
        {
            RD = 0;
        } // end else if
        speedX = speedX * friction * 1.960000E+000 + RD;
        speedY = speedY + gravity;
        Xpos = MCname._x + speedX;
        Ypos = MCname._y + speedY / 10;
        if (Xpos < L_Xlimit + MCname._width / 2)
        {
            Xpos = L_Xlimit + MCname._width / 2;
            speedX = -speedX * friction * 1.800000E+000;
        } // end if
        if (Xpos > R_Xlimit - MCname._width / 2)
        {
            Xpos = R_Xlimit - MCname._width / 2;
            speedX = -speedX * friction * 1.800000E+000;
        } // end if
        if (Ypos < U_Ylimit)
        {
            Ypos = U_Ylimit;
            speedY = -speedY * friction;
        } // end if
        if (Ypos > D_Ylimit)
        {
            Ypos = D_Ylimit;
            speedY = -speedY * friction;
        } // end if
        MCname._x = Xpos;
        MCname._y = Ypos;
        D_YlimitG = D_Ylimit;
    } // End of the function
    function ground()
    {
        if (Ypos eq D_YlimitG)
        {
            return (1);
        }
        else
        {
            return (0);
        } // end else if
    } // End of the function
    var speedX = 0;
    var speedY = 0;
    var Ypos = 0;
    var Xpos = 0;
    var friction = 5.000000E-001;
    var gravity = 9.800000E+000;
    var L_Xlimit = 0;
    var R_Xlimit = 550;
    var U_Ylimit = 0;
    var D_Ylimit = 400;
} // End of Class
