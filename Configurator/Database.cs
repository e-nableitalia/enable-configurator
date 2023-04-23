
using Microsoft.Data.SqlClient;
using System.Data.Common;
using System.Data;
using System.Data.SqlClient;


namespace Configurator
{
    public sealed class Database
    {
        private static Database instance = null;
        SqlConnection conn;

        string user = "u642028320_configurator";
        string database = "u642028320_enable";
        string password = "c8Z8?zt$nC:$";
        string server = "153.92.7.101";

        private static readonly object padlock = new object();

        Database()
        {
        }

        public static Database Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new Database();
                    }
                    return instance;
                }
            }
        }
        SqlConnection OpenConnection()
        {
            if (conn == null )
            {
                conn = new SqlConnection("user id=" + user + ";" +
                                       "password=" + password + ";server=" + server + ";" +
                                       "Trusted_Connection=yes;" +
                                       "database=" + database + "; " +
                                       "connection timeout=30");
                
            }
            if (  conn.State !=  ConnectionState.Open )
            {
                conn.Open();
            }

            return conn;

        }


    }
}
