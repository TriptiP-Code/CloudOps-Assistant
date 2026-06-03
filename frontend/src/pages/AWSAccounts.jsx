// const AWSAccounts = () => {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold">
//         AWS Accounts
//       </h1>

//       <div className="bg-white p-6 rounded-xl shadow mt-6">
//         AWS Connection Form Coming Next
//       </div>
//     </div>
//   );
// };

// export default AWSAccounts;


import { useEffect, useState } from "react";
import api from "../services/api";

const AWSAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  const [form, setForm] = useState({
    accountName: "",
    accessKey: "",
    secretKey: "",
    region: "ap-south-1",
  });

  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    try {
      const res = await api.get("/aws/accounts");
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/aws/connect",
        form
      );

      alert("AWS Account Connected");

      setForm({
        accountName: "",
        accessKey: "",
        secretKey: "",
        region: "ap-south-1",
      });

      fetchAccounts();
    } catch (err) {
      console.error(err);

      alert("Failed to connect account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        AWS Accounts
      </h1>

      {/* Form */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-6">
          Connect AWS Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4"
        >

          <input
            type="text"
            placeholder="Account Name"
            value={form.accountName}
            onChange={(e) =>
              setForm({
                ...form,
                accountName: e.target.value,
              })
            }
            className="bg-slate-800 p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="Access Key"
            value={form.accessKey}
            onChange={(e) =>
              setForm({
                ...form,
                accessKey: e.target.value,
              })
            }
            className="bg-slate-800 p-3 rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Secret Key"
            value={form.secretKey}
            onChange={(e) =>
              setForm({
                ...form,
                secretKey: e.target.value,
              })
            }
            className="bg-slate-800 p-3 rounded-lg outline-none"
          />

          <select
            value={form.region}
            onChange={(e) =>
              setForm({
                ...form,
                region: e.target.value,
              })
            }
            className="bg-slate-800 p-3 rounded-lg"
          >
            <option value="ap-south-1">
              ap-south-1
            </option>

            <option value="us-east-1">
              us-east-1
            </option>

            <option value="eu-west-1">
              eu-west-1
            </option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
          >
            {loading
              ? "Connecting..."
              : "Connect AWS Account"}
          </button>

        </form>
      </div>

      {/* Accounts Table */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Connected Accounts
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">
                Account Name
              </th>

              <th className="text-left py-3">
                Region
              </th>

              <th className="text-left py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {accounts.map((account) => (
              <tr
                key={account.id}
                className="border-b border-slate-800"
              >
                <td className="py-3">
                  {account.account_name}
                </td>

                <td className="py-3">
                  {account.region}
                </td>

                <td className="py-3 text-green-400">
                  Connected
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AWSAccounts;