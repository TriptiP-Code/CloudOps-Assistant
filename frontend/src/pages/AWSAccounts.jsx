import { useEffect, useState } from "react";
import api from "../services/api";

const AWSAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanningId, setScanningId] =
    useState(null);

  const [form, setForm] = useState({
    accountName: "",
    accessKey: "",
    secretKey: "",
    region: "ap-south-1",
  });

  const fetchAccounts = async () => {
    try {
      const res = await api.get(
        "/aws/accounts"
      );

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

      alert(
        "AWS Account Connected Successfully"
      );

      setForm({
        accountName: "",
        accessKey: "",
        secretKey: "",
        region: "ap-south-1",
      });

      fetchAccounts();
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Failed to connect account"
      );
    } finally {
      setLoading(false);
    }
  };

  const runScan = async (accountId) => {
    try {
      setScanningId(accountId);

      const res = await api.get(
        `/aws/scan/${accountId}`
      );

      alert(
        `Scan Completed!\n${res.data.totalInstances} EC2 instance(s) found`
      );
    } catch (err) {
      console.error(err);

      alert("Scan Failed");
    } finally {
      setScanningId(null);
    }
  };

  const Spinner = () => (
    <div
      className="
        w-4 h-4
        border-2
        border-white
        border-t-transparent
        rounded-full
        animate-spin
      "
    />
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        AWS Accounts
      </h1>

      {/* CONNECT ACCOUNT */}

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
                accountName:
                  e.target.value,
              })
            }
            className="bg-slate-800 p-3 rounded-lg outline-none"
            required
          />

          <input
            type="text"
            placeholder="Access Key"
            value={form.accessKey}
            onChange={(e) =>
              setForm({
                ...form,
                accessKey:
                  e.target.value,
              })
            }
            className="bg-slate-800 p-3 rounded-lg outline-none"
            required
          />

          <input
            type="password"
            placeholder="Secret Key"
            value={form.secretKey}
            onChange={(e) =>
              setForm({
                ...form,
                secretKey:
                  e.target.value,
              })
            }
            className="bg-slate-800 p-3 rounded-lg outline-none"
            required
          />

          <select
            value={form.region}
            onChange={(e) =>
              setForm({
                ...form,
                region:
                  e.target.value,
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
            className={`
              p-3 rounded-lg font-semibold transition
              ${
                loading
                  ? "bg-slate-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {loading
              ? "Connecting..."
              : "Connect AWS Account"}
          </button>
        </form>
      </div>

      {/* CONNECTED ACCOUNTS */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Connected AWS Accounts
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
                AWS Account ID
              </th>

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-left py-3">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {accounts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-slate-400"
                >
                  No AWS Accounts Connected
                </td>
              </tr>
            ) : (
              accounts.map((account) => (
                <tr
                  key={account.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-4">
                    {account.account_name}
                  </td>

                  <td className="py-4">
                    {account.region}
                  </td>

                  <td className="py-4">
                    {account.account_id}
                  </td>

                  <td className="py-4 text-green-400">
                    Connected
                  </td>

                  <td className="py-4">

                    <button
                      onClick={() =>
                        runScan(account.id)
                      }
                      disabled={
                        scanningId ===
                        account.id
                      }
                      className={`
                        flex items-center gap-2
                        px-4 py-2 rounded-lg
                        font-semibold transition
                        ${
                          scanningId ===
                          account.id
                            ? "bg-slate-700 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                        }
                      `}
                    >
                      {scanningId ===
                      account.id ? (
                        <>
                          <Spinner />
                          Scanning...
                        </>
                      ) : (
                        "Run Scan"
                      )}
                    </button>

                  </td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AWSAccounts;