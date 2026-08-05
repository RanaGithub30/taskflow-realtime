import { useState, useEffect, useRef } from 'react'
import Sidebar from '../../components/Sidebar'
import './Team.css'
import { apiPost, apiGet } from '../../services/api'
import { getUserDetails } from '../../services/userService'
import { useNavigate, useLocation } from 'react-router-dom'
import { showAlert } from '../../utils/alert'

export default function Team() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('')
  const [isAddingNewTeam, setIsAddingNewTeam] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [userTeams, setUserTeams] = useState([])
  const [isLoadingTeams, setIsLoadingTeams] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const processedInviteRef = useRef(null)
  const [showJoinConfirm, setShowJoinConfirm] = useState(false)
  const [inviteToConfirm, setInviteToConfirm] = useState(null)
  const [pendingInviteInfo, setPendingInviteInfo] = useState(null)
  const [showTeamDetailsModal, setShowTeamDetailsModal] = useState(false)
  const [teamDetailsMembers, setTeamDetailsMembers] = useState([])
  const [teamDetailsName, setTeamDetailsName] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('invite')
    if (!token) return

    // Prevent double-processing (React StrictMode mounts effects twice in dev)
    if (processedInviteRef.current === token) return
    processedInviteRef.current = token

    ;(async () => {
      try {
        const user = await getUserDetails().catch(() => null)
        if (!user) {
          // Save pending invite so after login we can show a notification
          try { localStorage.setItem('pendingInvite', token) } catch (e) {}
          navigate(`/login?next=${encodeURIComponent('/team')}`)
          return
        }

        // For logged-in users, validate and show a confirmation before accepting
        const resp = await apiGet(`/invite/validate/${token}`)
        const inviteData = resp?.data?.data ?? null
        setInviteToConfirm({ token, ...inviteData })
        setShowJoinConfirm(true)
      } catch (err) {
        console.error(err)
        showAlert.error(err?.response?.data?.message || 'Invite is no longer valid.')
        navigate('/team', { replace: true })
      }
    })()
  }, [location.search])

  // On mount, check localStorage for a pending invite (after login/registration)
  useEffect(() => {
    ;(async () => {
      try {
        const pending = localStorage.getItem('pendingInvite')
        if (!pending) return
        // If the token was already processed, clear it
        if (processedInviteRef.current === pending) {
          try { localStorage.removeItem('pendingInvite') } catch (e) {}
          return
        }

        const user = await getUserDetails().catch(() => null)
        if (!user) return // still not logged in

        // validate and show topbar notification
        const resp = await apiGet(`/invite/validate/${pending}`)
        const inviteData = resp?.data?.data ?? null
        if (inviteData) {
          setPendingInviteInfo({ token: pending, ...inviteData })
        }
      } catch (err) {
        console.error('Pending invite check failed', err)
        try { localStorage.removeItem('pendingInvite') } catch (e) {}
      }
    })()
  }, [])

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await apiGet('/teams')
        const teams = response?.data?.data ?? []
        setUserTeams(teams)
        if (teams.length > 0) {
          setSelectedTeam(teams[0].id)
          setIsAddingNewTeam(false)
        } else {
          setIsAddingNewTeam(true)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoadingTeams(false)
      }
    }

    loadTeams()
  }, [])

  async function openTeamDetails(team) {
    try {
      // Try to fetch members for the team; fallback to team.members if present
      const resp = await apiGet(`/teams/${team.id}/members`)
      const members = resp?.data?.data ?? team.members ?? []
      setTeamDetailsMembers(members)
      setTeamDetailsName(team.name)
      setShowTeamDetailsModal(true)
    } catch (err) {
      console.error('Failed to load team members', err)
      showAlert.error('Could not load team members')
    }
  }

  const members = [
    { id: 1, name: 'Rana Saha', role: 'Admin', team: 'Operations', email: 'rana@example.com', status: 'Active' },
    { id: 2, name: 'John Doe', role: 'Developer', team: 'Backend', email: 'john@example.com', status: 'Active' },
    { id: 3, name: 'Sarah Miller', role: 'QA Engineer', team: 'Testing', email: 'sarah@example.com', status: 'Active' },
    { id: 4, name: 'Mike Johnson', role: 'DevOps', team: 'Infrastructure', email: 'mike@example.com', status: 'Away' },
    { id: 5, name: 'Alex Lee', role: 'Product Manager', team: 'Product', email: 'alex@example.com', status: 'Active' },
    { id: 6, name: 'Emily Wong', role: 'UI/UX Designer', team: 'Design', email: 'emily@example.com', status: 'Active' },
  ]

  const teamsList = userTeams.map((team) => ({ id: team.id, name: team.name }))

  const filteredMembers = members.filter((member) => {
    const searchLower = search.toLowerCase()
    const matchesSearch = member.name.toLowerCase().includes(searchLower) || member.team.toLowerCase().includes(searchLower)
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  async function acceptInviteToken(token) {
    try {
      await apiPost('/invite/accept', { token })
      showAlert.success('Invite accepted — you are now a member of the team.')
      try { localStorage.removeItem('pendingInvite') } catch (e) {}
      processedInviteRef.current = token
      setShowJoinConfirm(false)
      setPendingInviteInfo(null)
      navigate('/team', { replace: true })
    } catch (err) {
      console.error(err)
      showAlert.error(err?.response?.data?.message || 'Could not accept invite')
      setShowJoinConfirm(false)
      try { localStorage.removeItem('pendingInvite') } catch (e) {}
    }
  }

  function declineInvite(token) {
    try { localStorage.removeItem('pendingInvite') } catch (e) {}
    setShowJoinConfirm(false)
    setInviteToConfirm(null)
    setPendingInviteInfo(null)
    navigate('/team', { replace: true })
  }

  return (
    <div className="team-layout">
      <Sidebar isAuthenticated={true} />

      <main className="team-main">
        <header className="team-header">
          <div>
            <p className="team-eyebrow">Team</p>
            <h1>Team members</h1>
            <p className="team-description">Monitor team activity, member roles, and collaboration status.</p>
          </div>
          <button className="button-primary" onClick={async () => {
            try {
              const user = await getUserDetails().catch(() => null);
              if (!user) {
                const next = '/team';
                navigate(`/login?next=${encodeURIComponent(next)}`);
                return;
              }

              const teamId = user?.team_id ?? (teamsList.length > 0 ? teamsList[0]?.id : '');
              setSelectedTeam(teamId);
              setIsAddingNewTeam(teamsList.length === 0);
              setShowInviteModal(true);
            } catch (err) {
              console.error(err);
              const msg = err?.response?.data?.message || 'Failed to create invite';
              showAlert.error(msg);
            }
          }}>Invite member</button>
        </header>

        {/* Pending invite topbar notification */}
        {pendingInviteInfo && (
          <div className="invite-notice">
            <div className="invite-notice-text">You have an invitation to join <strong>{pendingInviteInfo.team}</strong>.</div>
            <div className="invite-notice-actions">
              <button className="button-secondary" onClick={() => acceptInviteToken(pendingInviteInfo.token)}>Accept</button>
              <button className="button-tertiary" onClick={() => declineInvite(pendingInviteInfo.token)}>Dismiss</button>
            </div>
          </div>
        )}

        {/* Confirm join modal for token in URL */}
        {showJoinConfirm && inviteToConfirm && (
          <div className="invite-modal-overlay" onClick={() => declineInvite(inviteToConfirm.token)}>
            <div className="invite-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Join team — {inviteToConfirm.team}</h3>
              <p className="modal-sub">{inviteToConfirm.inviter?.name ? `Invited by ${inviteToConfirm.inviter.name}` : 'You have been invited to join this team.'}</p>
              <div className="modal-actions">
                <button className="button-tertiary" onClick={() => declineInvite(inviteToConfirm.token)}>No, thanks</button>
                <button className="button-secondary" onClick={() => acceptInviteToken(inviteToConfirm.token)}>Yes, join team</button>
              </div>
            </div>
          </div>
        )}

        {showInviteModal && (
          <div className="invite-modal-overlay" onClick={() => setShowInviteModal(false)}>
            <div className="invite-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Invite member — choose a team</h3>
              <p className="modal-sub">Select an existing team or create a new one.</p>

              {!isLoadingTeams && teamsList.length > 0 && !isAddingNewTeam ? (
                <label className="modal-field">
                  <span className="label">Team</span>
                  <select value={selectedTeam} onChange={(e) => {
                    const v = e.target.value;
                    if (v === '__new') { setIsAddingNewTeam(true); setSelectedTeam(''); return }
                    setSelectedTeam(v);
                  }}>
                    {teamsList.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                    <option value="__new">+ Create new team</option>
                  </select>
                </label>
              ) : (
                <label className="modal-field">
                  <span className="label">New team name</span>
                  <input
                    type="text"
                    placeholder="e.g. Platform Team"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                  />
                </label>
              )}

              <div className="modal-actions">
                <button className="button-tertiary" onClick={() => setShowInviteModal(false)}>Cancel</button>
                <button className="button-secondary" onClick={async () => {
                  try {
                    if (isAddingNewTeam) {
                      const teamName = newTeamName.trim();
                      if (!teamName) { showAlert.error('Please provide a team name'); return }
                      const created = await apiPost('/teams', { name: teamName });
                      const createdTeam = created?.data?.data;
                      if (!createdTeam?.id) {
                        showAlert.error('Could not create a new team');
                        return;
                      }
                      setUserTeams((prev) => [...prev, createdTeam]);
                      setSelectedTeam(createdTeam.id);
                      const resp = await apiPost('/invite', { team_id: createdTeam.id });
                      const inviteUrl = resp?.data?.data?.invite_url;
                      setShowInviteModal(false);
                      if (inviteUrl) {
                        const loginLink = `${window.location.origin}/login?next=${encodeURIComponent(inviteUrl)}`;
                        const message = `Join my team with this invite. Sign in here:\n\n${loginLink}`;
                        const wa = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
                        window.open(wa, '_blank');
                      }
                      return;
                    }

                    if (!selectedTeam) {
                      showAlert.error('Please select a team or create a new one');
                      return;
                    }

                    const resp = await apiPost('/invite', { team_id: selectedTeam });
                    const inviteUrl = resp?.data?.data?.invite_url;
                    setShowInviteModal(false);
                    if (inviteUrl) {
                      const loginLink = `${window.location.origin}/login?next=${encodeURIComponent(inviteUrl)}`;
                      const message = `Join my team with this invite. Sign in here:\n\n${loginLink}`;
                      const wa = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
                      window.open(wa, '_blank');
                    }
                  } catch (err) {
                    console.error(err);
                    // showAlert.error(err?.response?.data?.message || 'Failed to create invite');
                  }
                }}>Send invite</button>
              </div>
            </div>
          </div>
        )}

        <section className="team-toolbar">
          <div className="team-search-wrapper">
            <input
              type="text"
              className="team-search"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <select
            className="team-filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Developer">Developer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="DevOps">DevOps</option>
            <option value="Product Manager">Product Manager</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </section>

        <section className="team-list">
          <h2>Your teams</h2>
          {isLoadingTeams ? (
            <p>Loading teams…</p>
          ) : userTeams && userTeams.length > 0 ? (
            <div className="team-card-grid">
              {userTeams.map((team) => (
                <div key={team.id} className="team-card">
                  <div className="team-card-header">
                    <div className="team-card-avatar">{team.name.split(' ').map((part) => part[0]).join('').slice(0,2)}</div>
                    <div>
                      <p className="team-card-name">{team.name}</p>
                      <p className="team-card-sub">Team</p>
                    </div>
                  </div>
                  <div className="team-card-body">
                    <p className="team-card-count">{team.members ? team.members.length : (team.member_count ?? 0)}</p>
                    <p className="team-card-count-label">Members</p>
                  </div>
                  <div className="team-card-actions">
                    {/* Details button hidden for now; uncomment to restore future team member details behavior */}
                    {false && (
                      <button className="button-tertiary" onClick={() => openTeamDetails(team)}>Details</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">You are not a member of any teams yet.</div>
          )}
        </section>

        {showTeamDetailsModal && (
          <div className="invite-modal-overlay" onClick={() => setShowTeamDetailsModal(false)}>
            <div className="invite-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Members — {teamDetailsName}</h3>
              <div className="team-members-list">
                {teamDetailsMembers && teamDetailsMembers.length > 0 ? (
                  <ul>
                    {teamDetailsMembers.map((m) => (
                      <li key={m.id} className="team-member-row">
                        <strong>{m.name}</strong>
                        <div className="member-meta">{m.email ? m.email : m.role ? m.role : ''}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No members found for this team.</p>
                )}
              </div>
              <div className="modal-actions">
                <button className="button-secondary" onClick={() => setShowTeamDetailsModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
