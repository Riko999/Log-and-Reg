DROP TABLE Table;
CREATE TABLE [dbo].[Table] (
    [FirstName]   NVARCHAR (50) NOT NULL,
    [LastName]    NVARCHAR (50) NOT NULL,
    [Email]       NVARCHAR (50) NOT NULL,
    [DateOfBirth] NVARCHAR (50) NOT NULL,
    [Gender]      NVARCHAR (50) NOT NULL,
    [Phone]       NVARCHAR (12) NOT NULL,
    [Address]     NVARCHAR (50) NOT NULL,
    [UserName]    NVARCHAR (50) NOT NULL,
    [Password]    NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Table] PRIMARY KEY CLUSTERED ([UserName] ASC, [Email] ASC)
);